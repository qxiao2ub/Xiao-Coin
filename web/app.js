(() => {
  "use strict";

  const config = window.XIAO_CONFIG;
  let connectedAccount = null;

  const selectors = Object.freeze({
    name: "0x06fdde03",
    symbol: "0x95d89b41",
    decimals: "0x313ce567",
    totalSupply: "0x18160ddd",
    balanceOf: "0x70a08231",
  });

  const el = {
    connect: document.getElementById("connectButton"),
    copy: document.getElementById("copyContractButton"),
    contract: document.getElementById("contractText"),
    load: document.getElementById("loadDataButton"),
    switchNetwork: document.getElementById("switchNetworkButton"),
    addToken: document.getElementById("addTokenButton"),
    rpcStatus: document.getElementById("rpcStatus"),
    codeStatus: document.getElementById("codeStatus"),
    name: document.getElementById("nameValue"),
    symbol: document.getElementById("symbolValue"),
    decimals: document.getElementById("decimalsValue"),
    supply: document.getElementById("supplyValue"),
    balance: document.getElementById("balanceValue"),
    log: document.getElementById("activityLog"),
  };

  function log(message) {
    const stamp = new Date().toLocaleTimeString();
    el.log.textContent = `[${stamp}] ${message}\n${el.log.textContent}`.trim();
  }

  function shortAddress(address) {
    return `${address.slice(0, 6)}…${address.slice(-4)}`;
  }

  function isAddress(value) {
    return /^0x[a-fA-F0-9]{40}$/.test(value);
  }

  function padAddress(address) {
    if (!isAddress(address)) throw new Error("Invalid EVM address.");
    return address.slice(2).toLowerCase().padStart(64, "0");
  }

  function hexToBytes(hex) {
    const clean = hex.startsWith("0x") ? hex.slice(2) : hex;
    if (clean.length % 2 !== 0) throw new Error("Invalid hex response.");
    const bytes = new Uint8Array(clean.length / 2);
    for (let i = 0; i < bytes.length; i += 1) {
      bytes[i] = Number.parseInt(clean.slice(i * 2, i * 2 + 2), 16);
    }
    return bytes;
  }

  function decodeAbiString(result) {
    if (!result || result === "0x") return "";
    const hex = result.slice(2);
    if (hex.length === 64) {
      return new TextDecoder().decode(hexToBytes(hex)).replace(/\0+$/g, "");
    }
    if (hex.length < 128) throw new Error("Malformed ABI string response.");
    const offsetBytes = Number(BigInt(`0x${hex.slice(0, 64)}`));
    const offset = offsetBytes * 2;
    const length = Number(BigInt(`0x${hex.slice(offset, offset + 64)}`));
    const dataStart = offset + 64;
    const data = hex.slice(dataStart, dataStart + length * 2);
    return new TextDecoder().decode(hexToBytes(data));
  }

  function decodeUint(result) {
    if (!result || result === "0x") throw new Error("Empty uint response.");
    return BigInt(result);
  }

  function formatUnits(value, decimals, maxFraction = 6) {
    const base = 10n ** BigInt(decimals);
    const integer = value / base;
    const fractionRaw = (value % base).toString().padStart(decimals, "0");
    const fraction = fractionRaw.slice(0, maxFraction).replace(/0+$/g, "");
    return fraction ? `${integer.toLocaleString()}.${fraction}` : integer.toLocaleString();
  }

  async function rpc(method, params) {
    const response = await fetch(config.network.rpcUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: Date.now(), method, params }),
    });
    if (!response.ok) throw new Error(`RPC HTTP ${response.status}.`);
    const payload = await response.json();
    if (payload.error) throw new Error(payload.error.message || "RPC error.");
    return payload.result;
  }

  async function ethCall(data) {
    return rpc("eth_call", [{ to: config.token.contractAddress, data }, "latest"]);
  }

  async function copyContract() {
    await navigator.clipboard.writeText(config.token.contractAddress);
    el.copy.textContent = "Copied";
    log("Copied the official contract address.");
    setTimeout(() => { el.copy.textContent = "Copy"; }, 1400);
  }

  async function loadTokenData() {
    el.load.disabled = true;
    try {
      const chainHex = await rpc("eth_chainId", []);
      const chainId = Number.parseInt(chainHex, 16);
      if (chainId !== config.network.chainId) {
        throw new Error(`RPC returned chain ${chainId}, expected ${config.network.chainId}.`);
      }
      el.rpcStatus.textContent = `Base ${chainId}`;

      const code = await rpc("eth_getCode", [config.token.contractAddress, "latest"]);
      if (!code || code === "0x") throw new Error("No deployed bytecode found at the configured address.");
      el.codeStatus.textContent = "Present";

      const [nameHex, symbolHex, decimalsHex, supplyHex] = await Promise.all([
        ethCall(selectors.name),
        ethCall(selectors.symbol),
        ethCall(selectors.decimals),
        ethCall(selectors.totalSupply),
      ]);
      const name = decodeAbiString(nameHex);
      const symbol = decodeAbiString(symbolHex);
      const decimals = Number(decodeUint(decimalsHex));
      const totalSupply = decodeUint(supplyHex);

      el.name.textContent = name;
      el.symbol.textContent = symbol;
      el.decimals.textContent = String(decimals);
      el.supply.textContent = `${formatUnits(totalSupply, decimals, 0)} ${symbol}`;

      if (name !== config.token.name || symbol !== config.token.symbol) {
        log(`WARNING: onchain metadata differs from expected ${config.token.name} / ${config.token.symbol}.`);
      } else {
        log("Verified deployed bytecode and standard ERC-20 metadata on Base.");
      }

      if (connectedAccount) {
        const balanceHex = await ethCall(`${selectors.balanceOf}${padAddress(connectedAccount)}`);
        const balance = decodeUint(balanceHex);
        el.balance.textContent = `${formatUnits(balance, decimals)} ${symbol}`;
      }
    } catch (error) {
      const message = error?.message || String(error);
      el.rpcStatus.textContent = "Check failed";
      log(`ERROR: ${message}`);
      console.error(error);
    } finally {
      el.load.disabled = false;
    }
  }

  function requireWallet() {
    if (!window.ethereum?.request) throw new Error("No compatible browser wallet was detected.");
    return window.ethereum;
  }

  async function connectWallet() {
    const wallet = requireWallet();
    const accounts = await wallet.request({ method: "eth_requestAccounts" });
    if (!accounts?.length || !isAddress(accounts[0])) throw new Error("The wallet returned no valid account.");
    connectedAccount = accounts[0];
    el.connect.textContent = shortAddress(connectedAccount);
    el.addToken.disabled = false;
    log(`Connected ${connectedAccount}. No trade, transfer, approval, or signature was requested.`);
    await loadTokenData();
  }

  async function switchToBase() {
    const wallet = requireWallet();
    try {
      await wallet.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: config.network.chainIdHex }],
      });
    } catch (error) {
      if (error?.code !== 4902) throw error;
      await wallet.request({
        method: "wallet_addEthereumChain",
        params: [{
          chainId: config.network.chainIdHex,
          chainName: config.network.name,
          nativeCurrency: config.network.nativeCurrency,
          rpcUrls: [config.network.rpcUrl],
          blockExplorerUrls: [config.network.explorerUrl],
        }],
      });
    }
    log("Wallet switched to Base Mainnet (chain ID 8453). Verify it in the wallet UI.");
    if (connectedAccount) await loadTokenData();
  }

  async function addToken() {
    const wallet = requireWallet();
    const image = new URL("assets/xiao-coin-logo.png", window.location.href).href;
    const added = await wallet.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: config.token.contractAddress,
          symbol: config.token.symbol,
          decimals: config.token.decimals,
          image,
        },
      },
    });
    log(added ? "Wallet accepted the XIAO asset request." : "Wallet declined the XIAO asset request.");
  }

  async function run(action) {
    try {
      await action();
    } catch (error) {
      const message = error?.message || String(error);
      log(`ERROR: ${message}`);
      console.error(error);
    }
  }

  el.copy.addEventListener("click", () => run(copyContract));
  el.load.addEventListener("click", () => run(loadTokenData));
  el.connect.addEventListener("click", () => run(connectWallet));
  el.switchNetwork.addEventListener("click", () => run(switchToBase));
  el.addToken.addEventListener("click", () => run(addToken));

  if (window.ethereum?.on) {
    window.ethereum.on("accountsChanged", () => window.location.reload());
    window.ethereum.on("chainChanged", () => window.location.reload());
  }

  loadTokenData();
})();
