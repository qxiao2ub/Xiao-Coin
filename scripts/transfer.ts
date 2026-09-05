import { network } from "hardhat";
import { getAddress, isAddress, parseUnits } from "ethers";

const contractInput = process.env.XIAO_CONTRACT_ADDRESS?.trim();
const recipientInput = process.env.XIAO_RECIPIENT_ADDRESS?.trim();
const amountInput = process.env.XIAO_TRANSFER_AMOUNT?.trim();

if (!contractInput || !isAddress(contractInput)) {
  throw new Error("XIAO_CONTRACT_ADDRESS must be a valid contract address.");
}
if (!recipientInput || !isAddress(recipientInput)) {
  throw new Error("XIAO_RECIPIENT_ADDRESS must be a valid recipient address.");
}
if (!amountInput || !/^\d+(\.\d+)?$/.test(amountInput)) {
  throw new Error("XIAO_TRANSFER_AMOUNT must be a positive decimal string.");
}

const { ethers } = await network.create();
const [sender] = await ethers.getSigners();
const senderAddress = await sender.getAddress();
const networkInfo = await ethers.provider.getNetwork();

if (networkInfo.chainId !== 84532n && networkInfo.chainId !== 31337n) {
  throw new Error("This helper is restricted to Base Sepolia or a local development chain.");
}

const contractAddress = getAddress(contractInput);
const recipientAddress = getAddress(recipientInput);
const code = await ethers.provider.getCode(contractAddress);
if (code === "0x") {
  throw new Error(`No contract exists at ${contractAddress} on the selected network.`);
}

const token = (await ethers.getContractAt("XiaoCoin", contractAddress, sender)) as any;
const amount = parseUnits(amountInput, 18);
const balance = await token.balanceOf(senderAddress);

if (amount <= 0n) throw new Error("Transfer amount must be greater than zero.");
if (balance < amount) {
  throw new Error(
    `Insufficient XIAO balance. Available ${ethers.formatUnits(balance, 18)}, requested ${amountInput}.`,
  );
}

console.log(`Sender:    ${senderAddress}`);
console.log(`Recipient: ${recipientAddress}`);
console.log(`Amount:    ${amountInput} XIAO`);
console.log(`Chain ID:  ${networkInfo.chainId}`);

if (process.env.XIAO_TRANSFER_CONFIRMATION !== "SEND_TESTNET_XIAO") {
  throw new Error(
    "Set XIAO_TRANSFER_CONFIRMATION=SEND_TESTNET_XIAO after independently checking the recipient and amount.",
  );
}

const transaction = await token.transfer(recipientAddress, amount);
console.log(`Submitted: ${transaction.hash}`);
const receipt = await transaction.wait();
console.log(`Confirmed in block ${receipt?.blockNumber ?? "unknown"}.`);
