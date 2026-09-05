# Architecture

## Onchain component

`contracts/XiaoCoin.sol` inherits OpenZeppelin `ERC20`. The constructor validates
a nonzero treasury and mints the fixed supply. After construction, behavior is
the standard inherited ERC-20 interface.

There is no separate controller, access-control registry, fee collector,
upgrade administrator, oracle, bridge, decentralized exchange, staking pool, or
sale contract in scope.

## Offchain components

- Hardhat compiles, tests, deploys, and verifies.
- Ignition provides resumable, declarative deployments.
- TypeScript scripts perform preflight, inspection, and guarded test transfers.
- Deployment JSON records preserve chain, address, treasury, and transaction data.
- The static dashboard reads public chain state and requests user-signed wallet actions.
- GitHub Actions runs checks and publishes only the static `web/` folder.

## Trust boundaries

### Compiler and dependencies

The deployed bytecode depends on the exact Solidity compiler, settings, and
OpenZeppelin version. Review and commit the generated npm lock file.

### RPC provider

An RPC provider can lie, omit data, or be unavailable. For consequential
verification, compare at least two independent providers or explorers.

### Wallet

The wallet controls transaction signing. The website never receives a recovery
phrase or raw private key. Wallet simulations are useful but not authoritative.

### Treasury

The treasury receives the complete supply. A single hot wallet is not an
appropriate long-term treasury for a real-value project. Use reviewed multisignature
controls and documented approvals before production use.

### Static website

GitHub Pages hosts public files. The dashboard has no backend and cannot recover
funds, reverse transfers, or protect a compromised wallet.

## Data flow

```text
Developer source -> compiler -> deployment transaction -> Base chain
                                         |
                                         +-> fixed supply -> treasury

Browser -> injected wallet -> user confirmation -> ERC-20 call -> Base chain
   |
   +-> read-only RPC calls for code, metadata, supply, and balances
```

## Immutability consequence

Because the contract has no upgrade mechanism, a deployed bug cannot be patched
in place. A replacement would require a separate contract and a transparent
migration decision. This is both a security advantage and an operational constraint.
