import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const contractPath = path.join(root, "contracts", "XiaoCoin.sol");
const webConfigPath = path.join(root, "web", "config.js");
const hardhatConfigPath = path.join(root, "hardhat.config.ts");
const packagePath = path.join(root, "package.json");

const contract = await readFile(contractPath, "utf8");
const webConfig = await readFile(webConfigPath, "utf8");
const hardhatConfig = await readFile(hardhatConfigPath, "utf8");
const packageJson = JSON.parse(await readFile(packagePath, "utf8"));
const failures = [];

const requireText = (text, label) => {
  if (!contract.includes(text)) failures.push(`Contract missing ${label}: ${text}`);
};

requireText('ERC20("Xiao Coin", "XIAO")', "metadata");
requireText("1_000_000_000 * 10 ** 18", "fixed supply");
requireText("_mint(treasury, INITIAL_SUPPLY)", "constructor mint");
requireText("ZeroTreasuryAddress", "zero treasury protection");

const forbiddenContractPatterns = [
  /function\s+mint\s*\(/,
  /function\s+setTax\s*\(/,
  /function\s+blacklist\s*\(/,
  /tx\.origin/,
  /delegatecall/,
  /selfdestruct/,
];
for (const pattern of forbiddenContractPatterns) {
  if (pattern.test(contract)) failures.push(`Forbidden contract pattern found: ${pattern}`);
}

if (!webConfig.includes("chainId: 84532")) {
  failures.push("Web dashboard is not pinned to Base Sepolia chain ID 84532.");
}
if (!webConfig.includes('chainIdHex: "0x14a34"')) {
  failures.push("Web dashboard has an incorrect Base Sepolia hexadecimal chain ID.");
}

if (!hardhatConfig.includes("chainId: 84532")) {
  failures.push("Hardhat configuration is missing Base Sepolia chain ID 84532.");
}
if (!hardhatConfig.includes('chainType: "op"')) {
  failures.push("Hardhat Base configuration is not marked as OP Stack.");
}
if (!hardhatConfig.includes('configVariable("BASE_SEPOLIA_RPC_URL", {')) {
  failures.push("Hardhat RPC fallback must use the Hardhat 3 options-object syntax.");
}
if (!hardhatConfig.includes('default: "https://sepolia.base.org"')) {
  failures.push("Hardhat configuration is missing the official Base Sepolia RPC fallback.");
}
if (packageJson.engines?.node !== ">=22.13.0") {
  failures.push("package.json must require Node.js >=22.13.0 for the pinned Hardhat release.");
}

async function walk(directory) {
  const entries = await readdir(directory);
  const output = [];
  for (const entry of entries) {
    if ([".git", "node_modules", "artifacts", "cache", "dist"].includes(entry)) continue;
    const full = path.join(directory, entry);
    const info = await stat(full);
    if (info.isDirectory()) output.push(...(await walk(full)));
    else output.push(full);
  }
  return output;
}

const privateKeyPattern = /\b0x[a-fA-F0-9]{64}\b/g;
for (const file of await walk(root)) {
  if (!/\.(?:ts|js|mjs|json|md|sol|yml|yaml|txt|html|css|svg)$/.test(file)) continue;
  const contents = await readFile(file, "utf8");
  const matches = contents.match(privateKeyPattern) ?? [];
  if (matches.length > 0) {
    failures.push(`Possible plaintext private key in ${path.relative(root, file)}`);
  }
}

if (failures.length > 0) {
  console.error("Static repository checks failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Static repository checks passed.");
console.log("Verified: fixed supply, no public mint/tax/blacklist patterns, correct Base Sepolia IDs, and no obvious plaintext private keys.");
