<p align="center">
  <img src="web/assets/xiao-coin-logo.svg" width="132" alt="Xiao Coin logo" />
</p>

<h1 align="center">Xiao Coin (XIAO)</h1>

<p align="center">
  Transparent fixed-supply ERC-20 prototype for Base, with a deliberately small attack surface.
</p>

> **Current status:** development and public-testnet software. This repository
> does not announce a mainnet contract address, a token sale, a price, a yield,
> or an expectation of profit.

New users should begin with **`START_HERE.md`**.

## Repository highlights

- `XiaoCoin.sol`: 1,000,000,000 fixed-supply XIAO minted once to a treasury.
- OpenZeppelin ERC-20 implementation; no custom transfer accounting.
- No owner, post-deployment minting, tax, blacklist, pause switch, or proxy.
- Hardhat 3, Ethers v6, Mocha/Chai tests, TypeScript scripts, and Ignition module.
- Base Sepolia preflight, deploy, inspect, and test-transfer utilities.
- Encrypted Hardhat keystore workflow for private configuration variables.
- GitHub Actions for CI, CodeQL, dependency review, and GitHub Pages.
- Static, non-custodial Base Sepolia dashboard under `web/`.
- Detailed documentation for Remix, Hardhat, security, operations, and release gates.

## Token specification

| Property | Value |
|---|---|
| Name | Xiao Coin |
| Symbol | XIAO |
| Standard | ERC-20 |
| Supply | 1,000,000,000 XIAO |
| Decimals | 18 |
| Supply model | Fixed at deployment |
| Intended first public environment | Base Sepolia testnet |
| Base Sepolia chain ID | 84532 |
| Base mainnet chain ID | 8453 |
| Stablecoin | No |
| Owner/admin | None |
| Public mint | None |
| Transfer tax | None |
| Upgrade proxy | None |

## Architecture at a glance

```text
User wallet
    |
    | standard ERC-20 calls
    v
XiaoCoin.sol on an EVM chain
    |
    +-- name/symbol/decimals
    +-- totalSupply/balanceOf
    +-- transfer
    +-- approve/allowance/transferFrom

Offchain repository components
    +-- Hardhat tests and deployment tools
    +-- deployment records
    +-- static wallet dashboard
    +-- operational and security documentation
```

## Fastest safe path: Remix plus Base Sepolia

This path does not require exporting a private key into the repository.

1. Read `docs/REMIX_BASE_SEPOLIA_GUIDE.md`.
2. Open Remix from its official site and create `XiaoCoin.sol`.
3. Copy `contracts/XiaoCoin.sol` into Remix.
4. Compile with Solidity `0.8.34`, optimizer enabled, 200 runs, EVM target `cancun`.
5. In Deploy & Run, select `Browser Extension -> MetaMask`.
6. Verify the displayed network is **Base Sepolia, chain ID 84532**. Do not confuse
   it with Ethereum Sepolia, chain ID 11155111.
7. Confirm the wallet has Base Sepolia test ETH for gas.
8. Enter the treasury address, keep value at zero, and deploy.
9. Record the transaction hash and contract address.
10. Verify source code and run the post-deployment checks.

## Local Hardhat setup

### Requirements

- Node.js 22 or newer.
- npm 10 or newer.
- Git.

```bash
git clone https://github.com/YOUR_USERNAME/Xiao-Coin.git
cd Xiao-Coin
npm install
npm run check
```

`npm install` creates a local package lock. Review and commit that lock file so
future builds use the same dependency graph.

## Base Sepolia deployment with Hardhat

Use a dedicated testnet deployment wallet. Never commit a private key, recovery
phrase, or wallet password.

```bash
npx hardhat keystore set BASE_SEPOLIA_DEPLOYER_PRIVATE_KEY
```

The public Base Sepolia RPC is already configured as a default. A private RPC
provider can be stored in the encrypted keystore if desired:

```bash
npx hardhat keystore set BASE_SEPOLIA_RPC_URL
```

Fund the deployment wallet with Base Sepolia test ETH, then run:

```bash
npm run preflight:base-sepolia
npm run deploy:base-sepolia
```

By default, the deployer is also the treasury. To use another treasury in a
single shell session:

```bash
export XIAO_TREASURY_ADDRESS=0xYOUR_TREASURY
npm run preflight:base-sepolia
npm run deploy:base-sepolia
```

On PowerShell:

```powershell
$env:XIAO_TREASURY_ADDRESS="0xYOUR_TREASURY"
npm run preflight:base-sepolia
npm run deploy:base-sepolia
```

The direct script refuses unknown public chains and Base mainnet. It writes a
record to `deployments/chain-84532.json` after success.

## Reproducible deployment with Ignition

```bash
cp ignition/parameters/base-sepolia.example.json ignition/parameters/base-sepolia.json
# Edit and independently verify the treasury address.
npm run deploy:base-sepolia:ignition
```

For explorer verification, configure the verification API key supported by the
installed Hardhat verification plugin and run:

```bash
npm run verify:base-sepolia
```

Ignition records deployment state and constructor parameters, making a failed or
interrupted deployment easier to resume safely.

## Inspect a deployed contract

```bash
export XIAO_CONTRACT_ADDRESS=0xYOUR_CONTRACT
npm run inspect:base-sepolia
```

This checks deployed bytecode, name, symbol, decimals, and fixed supply.

## Configure and publish the dashboard

```bash
npm run web:configure -- --address 0xYOUR_CONTRACT
```

Commit the updated `web/config.js`, push to GitHub, and enable GitHub Pages using
GitHub Actions. The dashboard can also accept a contract address manually.

## Upload this repository to GitHub

Create an empty GitHub repository named `Xiao-Coin`, then use either the manual
commands in `docs/GITHUB_UPLOAD_GUIDE.md` or:

```bash
bash scripts/git-upload.sh https://github.com/YOUR_USERNAME/Xiao-Coin.git
```

## Documentation map

- `docs/REPOSITORY_MAP.md` - file-by-file repository and workflow guide.
- `docs/PROJECT_SPECIFICATION.md` - authoritative project requirements.
- `docs/ARCHITECTURE.md` - components and trust boundaries.
- `docs/REMIX_BASE_SEPOLIA_GUIDE.md` - detailed no-private-key deployment path.
- `docs/HARDHAT_GUIDE.md` - local testing and scripted deployment.
- `docs/POST_DEPLOYMENT_CHECKLIST.md` - verification immediately after deployment.
- `docs/TOKENOMICS.md` - supply design and non-binding allocation worksheet.
- `docs/TEST_PLAN.md` - expected automated and manual tests.
- `docs/SECURITY_CHECKLIST.md` - secure-development controls.
- `docs/THREAT_MODEL.md` - assets, actors, risks, and mitigations.
- `docs/OPERATIONS_RUNBOOK.md` - key, treasury, incident, and release operations.
- `docs/TROUBLESHOOTING.md` - common Remix, MetaMask, faucet, and Hardhat problems.
- `docs/MAINNET_RELEASE_GATES.md` - conditions that must precede mainnet.
- `docs/LEGAL_AND_RISK.md` - non-technical risks and boundaries.
- `docs/WHITEPAPER_DRAFT.md` - a clearly labeled draft, not an offering document.
- `docs/GLOSSARY.md` - technical terms in plain language.

## Security position

This repository favors simplicity over features. Simplicity does not make any
smart contract risk-free. Before real-value use:

1. freeze the exact commit and dependency lock;
2. run all automated tests and independent static analysis;
3. obtain an independent smart-contract review or audit;
4. verify constructor parameters and deployment chain out of band;
5. verify source code on the target explorer;
6. establish treasury controls, incident response, accounting, and legal review.

See `SECURITY.md` and `docs/MAINNET_RELEASE_GATES.md`.

## Author

**Dr. Qingyang Xiao**

## License

MIT. See `LICENSE`.
