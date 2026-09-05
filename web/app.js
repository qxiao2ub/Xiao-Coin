/* global ethers, XIAO_CONFIG, XIAO_ABI */
(() => {
  "use strict";

  const config = window.XIAO_CONFIG;
  const abi = window.XIAO_ABI;
  let browserProvider;
  let signer;
  let connectedAccount;
  let token;
  let loadedAddress;

  const byId = (id) => document.getElementById(id);
  const elements = {
    connect: byId("connectButton"),
    switchNetwork: byId("switchNetworkButton"),
    networkBadge: byId("networkBadge"),
    contractAddress: byId("contractAddress"),
    loadContract: byId("loadContractButton"),
    addToken: byId("addTokenButton"),
    explorer: byId("explorerLink"),
    account: byId("accountValue"),
    chain: byId("chainValue"),
    code: byId("codeValue"),
    name: byId("nameValue"),
    symbol: byId("symbolValue"),
    decimals: byId("decimalsValue"),
    supply: byId("supplyValue"),
    balance: byId("balanceValue"),
    transferForm: byId("transferForm"),
    recipient: byId("recipientAddress"),
    amount: byId("transferAmount"),
    send: byId("sendButton"),
    log: byId("activityLog"),
  };

  const shorten = (value) => `${value.slice(0, 7)}...${value.slice(-5)}`;
  const log = (message) => {
    const stamp = new Date().toLocaleTimeString();
    elements.log.textContent = `[${stamp}] ${message}\n${elements.log.textContent}`;
  };

  const setBadge = (text, state = "muted") => {
    elements.networkBadge.textContent = text;
    elements.networkBadge.className = `badge badge-${state}`;
  };

  function getInjectedProvider() {
    if (!window.ethereum) {
      throw new Error("No injected EVM wallet was detected. Install and unlock MetaMask.");
    }
    return window.ethereum;
  }

  async function connectWallet() {
    const injected = getInjectedProvider();
    browserProvider = new ethers.BrowserProvider(injected);
    await browserProvider.send("eth_requestAccounts", []);
    signer = await browserProvider.getSigner();
    connectedAccount = await signer.getAddress();
    const network = await browserProvider.getNetwork();

    elements.account.textContent = connectedAccount;
    elements.chain.textContent = network.chainId.toString();
    elements.connect.textContent = shorten(connectedAccount);
    updateNetworkState(network.chainId);
    log(`Wallet connected: ${connectedAccount}`);

    if (loadedAddress) await loadContract(loadedAddress);
  }

  function updateNetworkState(chainId) {
    const correct = chainId === BigInt(config.network.chainId);
    setBadge(
      correct ? config.network.name : `Wrong network: ${chainId}`,
      correct ? "good" : "bad",
    );
    elements.send.disabled = !(correct && token && signer);
  }

  async function switchToBaseSepolia() {
    const injected = getInjectedProvider();
    try {
      await injected.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: config.network.chainIdHex }],
      });
    } catch (error) {
      if (error && error.code === 4902) {
        await injected.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: config.network.chainIdHex,
              chainName: config.network.name,
              nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
              rpcUrls: [config.network.rpcUrl],
              blockExplorerUrls: [config.network.explorerUrl],
            },
          ],
        });
      } else {
        throw error;
      }
    }
    await connectWallet();
  }

  async function loadContract(addressOverride) {
    const raw = addressOverride || elements.contractAddress.value.trim();
    if (!ethers.isAddress(raw)) {
      throw new Error("Enter a valid EVM contract address.");
    }

    const address = ethers.getAddress(raw);
    elements.contractAddress.value = address;
    localStorage.setItem("xiaoContractAddress", address);

    const provider = browserProvider ?? new ethers.JsonRpcProvider(config.network.rpcUrl);
    const network = await provider.getNetwork();
    if (network.chainId !== BigInt(config.network.chainId)) {
      throw new Error(
        `Contract inspection is pinned to chain ID ${config.network.chainId}. Current chain ID is ${network.chainId}.`,
      );
    }

    const code = await provider.getCode(address);
    if (code === "0x") {
      elements.code.textContent = "No bytecode found";
      throw new Error(`No contract is deployed at ${address} on Base Sepolia.`);
    }

    token = new ethers.Contract(address, abi, signer ?? provider);
    loadedAddress = address;

    const [name, symbol, decimals, supply] = await Promise.all([
      token.name(),
      token.symbol(),
      token.decimals(),
      token.totalSupply(),
    ]);

    elements.code.textContent = `${(code.length - 2) / 2} bytes`;
    elements.name.textContent = name;
    elements.symbol.textContent = symbol;
    elements.decimals.textContent = decimals.toString();
    elements.supply.textContent = `${ethers.formatUnits(supply, decimals)} ${symbol}`;

    const matches =
      name === config.token.name &&
      symbol === config.token.symbol &&
      Number(decimals) === config.token.decimals &&
      ethers.formatUnits(supply, decimals) === `${config.token.totalSupply}.0`;

    if (!matches) {
      log("WARNING: Loaded contract metadata or supply does not match the repository specification.");
    } else {
      log(`Verified expected XIAO metadata at ${address}.`);
    }

    if (connectedAccount) {
      const balance = await token.balanceOf(connectedAccount);
      elements.balance.textContent = `${ethers.formatUnits(balance, decimals)} ${symbol}`;
    } else {
      elements.balance.textContent = "Connect wallet to query";
    }

    elements.addToken.disabled = false;
    elements.explorer.classList.remove("disabled");
    elements.explorer.href = `${config.network.explorerUrl}/address/${address}`;
    elements.send.disabled = !(signer && network.chainId === BigInt(config.network.chainId));
  }

  async function addTokenToWallet() {
    if (!loadedAddress) throw new Error("Load a contract first.");
    const injected = getInjectedProvider();
    const accepted = await injected.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: loadedAddress,
          symbol: config.token.symbol,
          decimals: config.token.decimals,
          image: new URL("assets/token-icon-512.png", window.location.href).href,
        },
      },
    });
    log(accepted ? "Wallet accepted the XIAO asset request." : "Wallet declined the XIAO asset request.");
  }

  async function sendTransfer(event) {
    event.preventDefault();
    if (!token || !signer || !connectedAccount) {
      throw new Error("Connect a wallet and load the XIAO contract first.");
    }

    const network = await browserProvider.getNetwork();
    if (network.chainId !== BigInt(config.network.chainId)) {
      throw new Error("Switch to Base Sepolia before sending a testnet transfer.");
    }

    const recipient = elements.recipient.value.trim();
    const amountText = elements.amount.value.trim();
    if (!ethers.isAddress(recipient)) throw new Error("Recipient address is invalid.");
    if (!/^\d+(\.\d+)?$/.test(amountText)) throw new Error("Amount must be a positive decimal number.");

    const amount = ethers.parseUnits(amountText, config.token.decimals);
    if (amount <= 0n) throw new Error("Amount must be greater than zero.");

    const balance = await token.balanceOf(connectedAccount);
    if (balance < amount) {
      throw new Error(`Insufficient XIAO. Available: ${ethers.formatUnits(balance, config.token.decimals)}.`);
    }

    const recipientChecksum = ethers.getAddress(recipient);
    const approved = window.confirm(
      `Review this Base Sepolia testnet transfer:\n\nFrom: ${connectedAccount}\nTo: ${recipientChecksum}\nAmount: ${amountText} XIAO\nContract: ${loadedAddress}\n\nProceed to the wallet confirmation?`,
    );
    if (!approved) {
      log("Transfer canceled before wallet signing.");
      return;
    }

    elements.send.disabled = true;
    try {
      const transaction = await token.connect(signer).transfer(recipientChecksum, amount);
      log(`Transfer submitted: ${transaction.hash}`);
      const receipt = await transaction.wait();
      log(`Transfer confirmed in block ${receipt.blockNumber}.`);
      await loadContract(loadedAddress);
    } finally {
      elements.send.disabled = false;
    }
  }

  async function run(action) {
    try {
      await action();
    } catch (error) {
      const message = error?.shortMessage || error?.message || String(error);
      log(`ERROR: ${message}`);
      console.error(error);
    }
  }

  elements.connect.addEventListener("click", () => run(connectWallet));
  elements.switchNetwork.addEventListener("click", () => run(switchToBaseSepolia));
  elements.loadContract.addEventListener("click", () => run(() => loadContract()));
  elements.addToken.addEventListener("click", () => run(addTokenToWallet));
  elements.transferForm.addEventListener("submit", (event) => run(() => sendTransfer(event)));

  const savedAddress = localStorage.getItem("xiaoContractAddress") || config.token.contractAddress;
  if (savedAddress) elements.contractAddress.value = savedAddress;

  if (window.ethereum?.on) {
    window.ethereum.on("accountsChanged", () => window.location.reload());
    window.ethereum.on("chainChanged", () => window.location.reload());
  }
})();
