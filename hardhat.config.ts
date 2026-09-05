import { configVariable, defineConfig } from "hardhat/config";
import hardhatToolboxMochaEthers from "@nomicfoundation/hardhat-toolbox-mocha-ethers";

export default defineConfig({
  plugins: [hardhatToolboxMochaEthers],

  solidity: {
    version: "0.8.34",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      // Base includes the Cancun execution-layer features. Pinning the target
      // avoids accidentally compiling for a newer fork than the target chain.
      evmVersion: "cancun",
      metadata: {
        bytecodeHash: "ipfs",
      },
    },
  },

  networks: {
    baseSepolia: {
      type: "http",
      chainType: "op",
      chainId: 84532,
      url: configVariable("BASE_SEPOLIA_RPC_URL", {
        default: "https://sepolia.base.org",
      }),
      accounts: [configVariable("BASE_SEPOLIA_DEPLOYER_PRIVATE_KEY")],
    },

    baseMainnet: {
      type: "http",
      chainType: "op",
      chainId: 8453,
      url: configVariable("BASE_MAINNET_RPC_URL", {
        default: "https://mainnet.base.org",
      }),
      accounts: [configVariable("BASE_MAINNET_DEPLOYER_PRIVATE_KEY")],
    },
  },

  test: {
    mocha: {
      timeout: 40_000,
    },
  },
});
