# Repository map

This document explains where each part of Xiao Coin lives and which files are
safe to edit during the normal development workflow.

## Root files

| Path | Purpose |
|---|---|
| `START_HERE.md` | First-run paths for GitHub upload, Remix testnet deployment, and Hardhat. |
| `README.md` | Project overview, quick start, and command reference. |
| `contracts/XiaoCoin.sol` | Authoritative Xiao Coin smart contract. |
| `hardhat.config.ts` | Compiler, Base Sepolia, Base mainnet, and plugin configuration. |
| `package.json` | Reproducible command entry points and pinned direct dependencies. |
| `tsconfig.json` | Strict TypeScript configuration for tests and scripts. |
| `SECURITY.md` | Vulnerability-reporting policy and key-handling rules. |
| `LICENSE` | MIT software license. |
| `CITATION.cff` | Citation metadata for academic or educational reuse. |

## Contract and tests

| Path | Purpose |
|---|---|
| `contracts/XiaoCoin.sol` | Fixed-supply ERC-20 implementation. |
| `contracts/README.md` | Contract-level design notes. |
| `test/XiaoCoin.ts` | Metadata, supply, transfer, allowance, and permission tests. |

The contract intentionally delegates standard token accounting to OpenZeppelin.
Any modification to token supply, transfer behavior, privileges, or upgradeability
is a security-sensitive design change and should trigger a new review.

## Deployment tooling

| Path | Purpose |
|---|---|
| `scripts/preflight.ts` | Checks chain ID, address validity, gas balance, and deployment simulation. |
| `scripts/deploy.ts` | Direct Base Sepolia/local deployment with a JSON record. |
| `ignition/modules/XiaoCoin.ts` | Declarative Hardhat Ignition deployment module. |
| `ignition/parameters/*.example.json` | Constructor-parameter templates. |
| `scripts/inspect-token.ts` | Reads deployed bytecode, metadata, decimals, and total supply. |
| `scripts/transfer.ts` | Guarded Base Sepolia/local test-transfer helper. |
| `scripts/mainnet-release-guard.mjs` | Blocks mainnet deployment unless explicit repository gates are satisfied. |
| `deployments/` | Human-readable deployment records; never store private keys here. |

## Static dashboard

| Path | Purpose |
|---|---|
| `web/index.html` | Accessible dashboard markup. |
| `web/styles.css` | Responsive visual design. |
| `web/app.js` | Wallet connection, network switching, contract inspection, and transfer flow. |
| `web/config.js` | Base Sepolia and deployed-contract configuration. |
| `web/abi.js` | Minimal human-readable ERC-20 ABI used by the browser. |
| `web/abi/XiaoCoin.json` | JSON ABI reference. |
| `web/assets/` | Logo, favicon, and wallet token icons. |
| `web/manifest.webmanifest` | Installable web-app metadata. |

The dashboard is non-custodial. It asks the injected wallet to sign transactions;
it does not receive or store private keys.

## Automation and governance

| Path | Purpose |
|---|---|
| `.github/workflows/ci.yml` | Static checks, linting, build, type checking, and tests. |
| `.github/workflows/codeql.yml` | JavaScript/TypeScript CodeQL analysis. |
| `.github/workflows/dependency-review.yml` | Pull-request dependency review. |
| `.github/workflows/pages.yml` | Publishes `web/` through GitHub Pages. |
| `.github/ISSUE_TEMPLATE/` | Structured bug and feature reports. |
| `CONTRIBUTING.md` | Contribution workflow and quality expectations. |
| `CODE_OF_CONDUCT.md` | Community behavior policy. |
| `CHANGELOG.md` | Human-maintained release history. |

## Documentation

The `docs/` directory covers architecture, token specifications, Remix and
Hardhat deployment, security, testing, treasury operations, threat modeling,
troubleshooting, mainnet release gates, legal boundaries, and the draft
whitepaper.

## Normal development sequence

```text
Edit contract or tooling
        |
        v
npm run check:static
        |
        v
npm run lint:sol
        |
        v
npm run build
        |
        v
npm run typecheck
        |
        v
npm run test
        |
        v
Base Sepolia preflight
        |
        v
Base Sepolia deployment
        |
        v
Source verification and post-deployment inspection
        |
        v
Dashboard configuration and GitHub Pages publication
```

## Files that must never be committed

- recovery phrases;
- plaintext private keys;
- wallet passwords;
- API secrets;
- real Ignition parameter files containing unreviewed mainnet addresses;
- Hardhat keystore contents if the repository will be shared;
- local build outputs and dependency folders.

The `.gitignore` file provides baseline protection, but it is not a substitute
for reviewing `git diff --staged` before every push.
