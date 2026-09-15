import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, "..");
const contract = "0xc62792b29E6aDbc179e47DAfCe159119bb918888";
const required = [
  "README.md",
  "README.zh-CN.md",
  "OFFICIAL_CONTRACT.md",
  "CONTRACT_ADDRESS.txt",
  "metadata/project.json",
  "metadata/token.json",
  "web/index.html",
  "web/config.js",
  "web/app.js",
  "web/styles.css",
  "web/assets/xiao-coin-logo.png",
  "web/assets/token-icon-192.png",
  "web/assets/token-icon-512.png",
  "web/assets/base-meme-qr.png",
  "web/assets/basescan-qr.png",
];

const errors = [];
for (const rel of required) {
  if (!fs.existsSync(path.join(root, rel))) errors.push(`Missing ${rel}`);
}

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

for (const rel of [
  "README.md",
  "README.zh-CN.md",
  "OFFICIAL_CONTRACT.md",
  "CONTRACT_ADDRESS.txt",
  "web/config.js",
  "metadata/project.json",
  "metadata/token.json",
]) {
  if (fs.existsSync(path.join(root, rel)) && !read(rel).includes(contract)) {
    errors.push(`${rel} does not contain canonical contract`);
  }
}

const config = read("web/config.js");
if (!config.includes("chainId: 8453")) errors.push("web/config.js must use Base chain ID 8453");
if (!config.includes('chainIdHex: "0x2105"')) errors.push("web/config.js must use chain ID hex 0x2105");
if (config.includes("84532") || config.includes("11155111")) {
  errors.push("web/config.js contains a testnet chain ID");
}

for (const rel of ["metadata/project.json", "metadata/token.json", "web/manifest.webmanifest", "package.json"]) {
  try {
    JSON.parse(read(rel));
  } catch (error) {
    errors.push(`${rel} invalid JSON: ${error.message}`);
  }
}

function pngSize(rel) {
  const b = fs.readFileSync(path.join(root, rel));
  if (b.toString("hex", 0, 8) !== "89504e470d0a1a0a") throw new Error(`${rel} is not PNG`);
  return [b.readUInt32BE(16), b.readUInt32BE(20)];
}

for (const [rel, expected] of [
  ["web/assets/xiao-coin-logo.png", 1024],
  ["web/assets/token-icon-192.png", 192],
  ["web/assets/token-icon-512.png", 512],
]) {
  try {
    const [w, h] = pngSize(rel);
    if (w !== expected || h !== expected) {
      errors.push(`${rel} is ${w}x${h}, expected ${expected}x${expected}`);
    }
  } catch (error) {
    errors.push(error.message);
  }
}

const textFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", "node_modules"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(md|html|js|json|yml|yaml|txt|cff|css)$/i.test(entry.name)) textFiles.push(full);
  }
}
walk(root);

const explicitSecretPatterns = [
  /(?:private[_ -]?key|seed phrase|recovery phrase)\s*[:=]\s*["']?0x[a-fA-F0-9]{64}/i,
  /(?:mnemonic|seed)[_ -]?(?:phrase)?\s*[:=]\s*["'][a-z]+(?:\s+[a-z]+){11,23}["']/i,
];
for (const full of textFiles) {
  const text = fs.readFileSync(full, "utf8");
  if (text.includes("YOUR_PRIVATE_KEY")) {
    errors.push(`Private-key placeholder found in ${path.relative(root, full)}`);
  }
  for (const pattern of explicitSecretPatterns) {
    if (pattern.test(text)) errors.push(`Possible embedded secret in ${path.relative(root, full)}`);
  }
}

if (errors.length) {
  console.error(`Static checks failed:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log(`Static checks passed for Xiao-Coin ${contract}.`);
