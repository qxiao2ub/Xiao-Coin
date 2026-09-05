import { expect } from "chai";
import { network } from "hardhat";

async function deployFixture() {
  const { ethers } = await network.create();
  const [deployer, treasury, recipient, spender] = await ethers.getSigners();
  const treasuryAddress = await treasury.getAddress();

  const token = (await ethers.deployContract("XiaoCoin", [treasuryAddress])) as any;
  await token.waitForDeployment();

  return {
    ethers,
    token,
    deployer,
    treasury,
    recipient,
    spender,
    treasuryAddress,
  };
}

describe("XiaoCoin", function () {
  it("sets the expected ERC-20 metadata", async function () {
    const { token } = await deployFixture();

    expect(await token.name()).to.equal("Xiao Coin");
    expect(await token.symbol()).to.equal("XIAO");
    expect(await token.decimals()).to.equal(18n);
  });

  it("mints exactly 1,000,000,000 XIAO to the treasury", async function () {
    const { ethers, token, treasuryAddress } = await deployFixture();
    const expectedSupply = ethers.parseUnits("1000000000", 18);

    expect(await token.INITIAL_SUPPLY()).to.equal(expectedSupply);
    expect(await token.totalSupply()).to.equal(expectedSupply);
    expect(await token.balanceOf(treasuryAddress)).to.equal(expectedSupply);
  });

  it("does not mint any token to the deployer unless it is the treasury", async function () {
    const { token, deployer, treasuryAddress } = await deployFixture();
    const deployerAddress = await deployer.getAddress();

    expect(deployerAddress).not.to.equal(treasuryAddress);
    expect(await token.balanceOf(deployerAddress)).to.equal(0n);
  });

  it("supports ordinary ERC-20 transfers", async function () {
    const { ethers, token, treasury, recipient, treasuryAddress } = await deployFixture();
    const recipientAddress = await recipient.getAddress();
    const amount = ethers.parseUnits("100", 18);

    await expect(token.connect(treasury).transfer(recipientAddress, amount))
      .to.emit(token, "Transfer")
      .withArgs(treasuryAddress, recipientAddress, amount);

    expect(await token.balanceOf(recipientAddress)).to.equal(amount);
    expect(await token.totalSupply()).to.equal(ethers.parseUnits("1000000000", 18));
  });

  it("supports approve and transferFrom", async function () {
    const { ethers, token, treasury, recipient, spender, treasuryAddress } = await deployFixture();
    const recipientAddress = await recipient.getAddress();
    const spenderAddress = await spender.getAddress();
    const amount = ethers.parseUnits("25", 18);

    await expect(token.connect(treasury).approve(spenderAddress, amount))
      .to.emit(token, "Approval")
      .withArgs(treasuryAddress, spenderAddress, amount);

    await token.connect(spender).transferFrom(treasuryAddress, recipientAddress, amount);

    expect(await token.balanceOf(recipientAddress)).to.equal(amount);
    expect(await token.allowance(treasuryAddress, spenderAddress)).to.equal(0n);
  });

  it("rejects a zero-address treasury", async function () {
    const { ethers } = await network.create();
    const factory = await ethers.getContractFactory("XiaoCoin");

    await expect(factory.deploy(ethers.ZeroAddress)).to.be.revertedWithCustomError(
      factory,
      "ZeroTreasuryAddress",
    );
  });

  it("has no public owner or mint function in its ABI", async function () {
    const { token } = await deployFixture();
    const functionNames = token.interface.fragments
      .filter((fragment: any) => fragment.type === "function")
      .map((fragment: any) => fragment.name);

    expect(functionNames).not.to.include("owner");
    expect(functionNames).not.to.include("mint");
    expect(functionNames).not.to.include("pause");
    expect(functionNames).not.to.include("blacklist");
  });
});
