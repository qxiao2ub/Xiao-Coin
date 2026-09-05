# Hardhat guide

## Installation

```bash
npm install
npm run check
```

The repository uses Hardhat 3 with Ethers and Mocha. Configuration is ESM-first.
The compiler is pinned to Solidity 0.8.34 and the EVM target to Cancun.

## Secrets

Hardhat configuration variables are resolved lazily. Store deployment keys in
the encrypted Hardhat keystore:

```bash
npx hardhat keystore set BASE_SEPOLIA_DEPLOYER_PRIVATE_KEY
npx hardhat keystore set BASE_MAINNET_DEPLOYER_PRIVATE_KEY
```

Optional RPC configuration:

```bash
npx hardhat keystore set BASE_SEPOLIA_RPC_URL
npx hardhat keystore set BASE_MAINNET_RPC_URL
```

Use only a dedicated deployment key. Do not use a wallet that holds unrelated assets.

## Build and test

```bash
npm run build
npm run typecheck
npm test
```

## Base Sepolia preflight

```bash
npm run preflight:base-sepolia
```

It confirms chain ID, treasury validity, gas balance, and deployment gas simulation.

## Direct deployment

The direct script defaults the treasury to the deployer. Set an alternate public
address only for the current shell if required:

```bash
export XIAO_TREASURY_ADDRESS=0x...
npm run deploy:base-sepolia
```

The script refuses Base mainnet and unknown public chains. It records the result
under `deployments/`.

## Ignition deployment

```bash
cp ignition/parameters/base-sepolia.example.json ignition/parameters/base-sepolia.json
# Edit the treasury.
npm run deploy:base-sepolia:ignition
```

Ignition is recommended when repeatability and resumability are priorities.

## Contract inspection

```bash
export XIAO_CONTRACT_ADDRESS=0x...
npm run inspect:base-sepolia
```

## Guarded test transfer

```bash
export XIAO_CONTRACT_ADDRESS=0x...
export XIAO_RECIPIENT_ADDRESS=0x...
export XIAO_TRANSFER_AMOUNT=100
export XIAO_TRANSFER_CONFIRMATION=SEND_TESTNET_XIAO
npm run transfer:base-sepolia
```

The helper is restricted to Base Sepolia or a local chain.

## Windows PowerShell variables

```powershell
$env:XIAO_CONTRACT_ADDRESS="0x..."
$env:XIAO_RECIPIENT_ADDRESS="0x..."
$env:XIAO_TRANSFER_AMOUNT="100"
$env:XIAO_TRANSFER_CONFIRMATION="SEND_TESTNET_XIAO"
npm run transfer:base-sepolia
```
