import { existsSync, readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { getAddress, isAddress } from "ethers";

const required = {
  XIAO_MAINNET_RELEASE_APPROVAL: "I_ACCEPT_IMMUTABLE_BASE_MAINNET_DEPLOYMENT",
  XIAO_SECURITY_REVIEW_COMPLETE: "YES",
  XIAO_LEGAL_REVIEW_COMPLETE: "YES",
  XIAO_TREASURY_REVIEW_COMPLETE: "YES",
};

const failures = [];
for (const [name, expected] of Object.entries(required)) {
  if (process.env[name] !== expected) {
    failures.push(`${name} must equal ${expected}`);
  }
}

const parameterPath = "ignition/parameters/base-mainnet.json";
if (!existsSync(parameterPath)) {
  failures.push(`Missing ${parameterPath}; copy and review the example first.`);
} else {
  try {
    const parsed = JSON.parse(readFileSync(parameterPath, "utf8"));
    const treasury = parsed?.XiaoCoinModule?.treasury;
    if (!isAddress(treasury)) {
      failures.push("The mainnet treasury parameter is not a valid address.");
    } else if (getAddress(treasury) === "0x1111111111111111111111111111111111111111") {
      failures.push("The mainnet treasury still contains the example placeholder.");
    }
  } catch (error) {
    failures.push(`Unable to parse ${parameterPath}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures.length > 0) {
  console.error("Base mainnet deployment blocked:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  console.error("\nRead docs/MAINNET_RELEASE_GATES.md before proceeding.");
  process.exit(1);
}

console.log("All repository mainnet release gates passed.");
console.log("This does not replace an independent audit, legal review, or address verification.");

const npx = process.platform === "win32" ? "npx.cmd" : "npx";
const result = spawnSync(
  npx,
  [
    "hardhat",
    "ignition",
    "deploy",
    "ignition/modules/XiaoCoin.ts",
    "--network",
    "baseMainnet",
    "--parameters",
    parameterPath,
  ],
  { stdio: "inherit" },
);

process.exit(result.status ?? 1);
