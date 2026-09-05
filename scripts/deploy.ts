import { mkdir, writeFile } from "node:fs/promises";
import { network } from "hardhat";
import { getAddress, isAddress } from "ethers";

const { ethers } = await network.create();
const [deployer] = await ethers.getSigners();
const deployerAddress = await deployer.getAddress();
const selectedNetwork = await ethers.provider.getNetwork();
const chainId = selectedNetwork.chainId;

if (chainId !== 84532n && chainId !== 31337n) {
  throw new Error(
    `Direct deployment is restricted to Base Sepolia (84532) or a local chain (31337). Received ${chainId}. Use the guarded mainnet workflow for Base mainnet.`,
  );
}

const suppliedTreasury = process.env.XIAO_TREASURY_ADDRESS?.trim();
const treasury = suppliedTreasury ?? deployerAddress;

if (!isAddress(treasury)) {
  throw new Error("XIAO_TREASURY_ADDRESS is not a valid EVM address.");
}

const normalizedTreasury = getAddress(treasury);
const deployerBalance = await ethers.provider.getBalance(deployerAddress);

console.log("Xiao Coin deployment");
console.log("--------------------");
console.log(`Chain ID:  ${chainId}`);
console.log(`Deployer:  ${deployerAddress}`);
console.log(`Treasury:  ${normalizedTreasury}`);
console.log(`Balance:   ${ethers.formatEther(deployerBalance)} ETH`);

if (deployerBalance === 0n && chainId !== 31337n) {
  throw new Error("The deployer has no network ETH for gas.");
}

const token = (await ethers.deployContract("XiaoCoin", [normalizedTreasury], deployer)) as any;
await token.waitForDeployment();

const address = await token.getAddress();
const deploymentTransaction = token.deploymentTransaction();
const receipt = deploymentTransaction
  ? await deploymentTransaction.wait()
  : undefined;

const record = {
  schemaVersion: 1,
  token: {
    name: await token.name(),
    symbol: await token.symbol(),
    decimals: Number(await token.decimals()),
    totalSupplyBaseUnits: (await token.totalSupply()).toString(),
    totalSupplyHuman: "1000000000",
  },
  network: {
    chainId: chainId.toString(),
    name: selectedNetwork.name,
  },
  contractAddress: address,
  deployer: deployerAddress,
  treasury: normalizedTreasury,
  transactionHash: deploymentTransaction?.hash ?? null,
  blockNumber: receipt?.blockNumber ?? null,
  createdAt: new Date().toISOString(),
};

await mkdir("deployments", { recursive: true });
const outputPath = `deployments/chain-${chainId}.json`;
await writeFile(outputPath, `${JSON.stringify(record, null, 2)}\n`, "utf8");

console.log("");
console.log("Deployment complete");
console.log(`Contract:  ${address}`);
console.log(`Tx hash:   ${deploymentTransaction?.hash ?? "unavailable"}`);
console.log(`Record:    ${outputPath}`);

if (chainId === 84532n) {
  console.log(`Explorer:  https://sepolia.basescan.org/address/${address}`);
}
