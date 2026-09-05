import { readFile, writeFile } from "node:fs/promises";
import { getAddress, isAddress } from "ethers";

const rawArgs = process.argv.slice(2);
const readArg = (name) => {
  const index = rawArgs.indexOf(name);
  return index >= 0 ? rawArgs[index + 1] : undefined;
};

const input = readArg("--address") ?? process.env.XIAO_CONTRACT_ADDRESS;
if (!input || !isAddress(input)) {
  console.error("Usage: npm run web:configure -- --address 0xYourContractAddress");
  process.exit(1);
}

const address = getAddress(input);
const path = new URL("../web/config.js", import.meta.url);
const current = await readFile(path, "utf8");
const updated = current.replace(
  /contractAddress:\s*"[^"]*"/,
  `contractAddress: "${address}"`,
);

if (updated === current) {
  throw new Error("Could not locate contractAddress in web/config.js");
}

await writeFile(path, updated, "utf8");
console.log(`Configured web dashboard for ${address}`);
