# Start here

This repository supports three separate activities. Keep them separate so a test
transaction is never mistaken for a production release.

## Goal A: upload the source to GitHub

1. Extract the ZIP into a normal folder.
2. Open Git Bash or PowerShell in the extracted `Xiao-Coin` folder.
3. Create an empty GitHub repository named `Xiao-Coin`.
4. Review the repository and replace `YOUR_USERNAME` placeholders where desired.
5. Push with one of the included helpers:

```bash
bash scripts/git-upload.sh https://github.com/YOUR_USERNAME/Xiao-Coin.git
```

```powershell
.\scripts\git-upload.ps1 -RemoteUrl "https://github.com/YOUR_USERNAME/Xiao-Coin.git"
```

The full instructions are in `docs/GITHUB_UPLOAD_GUIDE.md`.

## Goal B: deploy the public testnet prototype using Remix

Use this path when you do not want to expose a private key to a local project.

1. Read `docs/REMIX_BASE_SEPOLIA_GUIDE.md` from beginning to end.
2. Copy `contracts/XiaoCoin.sol` into the official Remix IDE.
3. Compile with Solidity 0.8.34, optimizer enabled with 200 runs, and Cancun EVM target.
4. Connect Remix to MetaMask using Browser Extension.
5. Confirm the target is **Base Sepolia, chain ID 84532**.
6. Confirm the wallet has **Base Sepolia test ETH**, not Ethereum Sepolia ETH.
7. Use the intended nonzero treasury address, leave transaction value at zero, and deploy.
8. Save the contract address and transaction hash.
9. Complete every item in `docs/POST_DEPLOYMENT_CHECKLIST.md`.

Do not click Confirm when Remix or MetaMask displays Ethereum Sepolia chain ID
11155111 if the intended target is Base Sepolia.

## Goal C: test and deploy with Hardhat

Use a dedicated testnet-only key and the encrypted Hardhat keystore.

```bash
npm install
npm run check
npx hardhat keystore set BASE_SEPOLIA_DEPLOYER_PRIVATE_KEY
npm run preflight:base-sepolia
npm run deploy:base-sepolia
```

After the first successful `npm install`, review and commit the generated
`package-lock.json` for reproducible installations.

## What this repository intentionally does not do

- It does not include a deployed mainnet contract address.
- It does not include a token sale, price, profit promise, liquidity pool, or exchange listing.
- It does not contain a private key or recovery phrase.
- It does not create a stablecoin or promise redemption for dollars.
- It does not make the software audited merely by including tests and checklists.

## Release order

```text
local checks
    -> Remix VM or Hardhat local simulation
    -> Base Sepolia public testnet
    -> independent technical and legal review
    -> explicit mainnet release decision
```
