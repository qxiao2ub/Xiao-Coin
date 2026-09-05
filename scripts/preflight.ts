import { network } from "hardhat";
import { getAddress, isAddress } from "ethers";

const { ethers } = await network.create();
const [deployer] = await ethers.getSigners();
const deployerAddress = await deployer.getAddress();
const networkInfo = await ethers.provider.getNetwork();
const chainId = networkInfo.chainId;
const balance = await ethers.provider.getBalance(deployerAddress);
const treasuryInput = process.env.XIAO_TREASURY_ADDRESS?.trim() ?? deployerAddress;

const checks: Array<{ name: string; ok: boolean; detail: string }> = [];
checks.push({
  name: "Target network",
  ok: chainId === 84532n,
  detail: `Expected Base Sepolia chain ID 84532; received ${chainId}`,
});
checks.push({
  name: "Treasury address",
  ok: isAddress(treasuryInput),
  detail: isAddress(treasuryInput)
    ? getAddress(treasuryInput)
    : "Invalid XIAO_TREASURY_ADDRESS",
});
checks.push({
  name: "Deployer gas balance",
  ok: balance > 0n,
  detail: `${ethers.formatEther(balance)} ETH`,
});

if (isAddress(treasuryInput)) {
  const factory = await ethers.getContractFactory("XiaoCoin", deployer);
  const transaction = await factory.getDeployTransaction(getAddress(treasuryInput));

  try {
    const estimatedGas = await ethers.provider.estimateGas({
      ...transaction,
      from: deployerAddress,
    });
    checks.push({
      name: "Deployment gas simulation",
      ok: estimatedGas > 0n,
      detail: `${estimatedGas.toString()} gas`,
    });
  } catch (error) {
    checks.push({
      name: "Deployment gas simulation",
      ok: false,
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}

console.log("Xiao Coin Base Sepolia preflight");
console.log("=================================");
console.log(`Deployer: ${deployerAddress}`);
console.log("");

for (const check of checks) {
  console.log(`${check.ok ? "PASS" : "FAIL"}  ${check.name}: ${check.detail}`);
}

if (checks.some((check) => !check.ok)) {
  process.exitCode = 1;
} else {
  console.log("");
  console.log("All required preflight checks passed.");
}
