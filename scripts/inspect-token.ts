import { network } from "hardhat";
import { getAddress, isAddress } from "ethers";

const addressInput = process.env.XIAO_CONTRACT_ADDRESS?.trim();
if (!addressInput || !isAddress(addressInput)) {
  throw new Error(
    "Set XIAO_CONTRACT_ADDRESS to a valid deployed XiaoCoin address before running this script.",
  );
}

const { ethers } = await network.create();
const address = getAddress(addressInput);
const code = await ethers.provider.getCode(address);
if (code === "0x") {
  throw new Error(`No contract bytecode exists at ${address} on the selected network.`);
}

const token = (await ethers.getContractAt("XiaoCoin", address)) as any;
const networkInfo = await ethers.provider.getNetwork();
const expectedSupply = ethers.parseUnits("1000000000", 18);
const name = await token.name();
const symbol = await token.symbol();
const decimals = await token.decimals();
const totalSupply = await token.totalSupply();

console.log("Xiao Coin inspection");
console.log("--------------------");
console.log(`Chain ID:      ${networkInfo.chainId}`);
console.log(`Address:       ${address}`);
console.log(`Name:          ${name}`);
console.log(`Symbol:        ${symbol}`);
console.log(`Decimals:      ${decimals}`);
console.log(`Total supply:  ${ethers.formatUnits(totalSupply, decimals)} ${symbol}`);
console.log(`Bytecode size: ${(code.length - 2) / 2} bytes`);
console.log("");

const matches =
  name === "Xiao Coin" &&
  symbol === "XIAO" &&
  decimals === 18n &&
  totalSupply === expectedSupply;

console.log(matches ? "PASS: Metadata and supply match the repository specification." : "FAIL: The contract does not match the expected specification.");
if (!matches) process.exitCode = 1;
