# Test plan

## Automated unit tests

The TypeScript suite verifies:

- exact name, symbol, and decimals;
- exact fixed supply;
- complete initial treasury allocation;
- deployer receives nothing when separate from treasury;
- standard transfer behavior and Transfer event;
- approve and transferFrom behavior;
- zero treasury rejection;
- absence of owner, mint, pause, and blacklist functions in the ABI.

Run:

```bash
npm test
```

## Static checks

`npm run check:static` verifies important design markers, searches for forbidden
contract features, confirms Base Sepolia IDs in the dashboard, and scans text
files for obvious plaintext private keys.

Static pattern checks are defense in depth, not an audit.

## Manual local tests

- Deploy to Hardhat's simulated network.
- Confirm total supply and treasury balance.
- Transfer 100 XIAO to a second account.
- Approve 25 XIAO and exercise transferFrom from a third account.
- Attempt an over-balance transfer and confirm the standard ERC-20 revert.

## Public-testnet tests

- Confirm Base Sepolia chain ID 84532.
- Run preflight and gas simulation.
- Deploy and verify source.
- Inspect metadata and supply through two independent clients.
- Transfer a small amount to a separate test account.
- Import the token into MetaMask using the exact contract address.
- Exercise the static dashboard.

## Mainnet tests and review

No mainnet deployment should occur until the release gates document is fully
signed off. Testnet success does not prove economic, legal, operational, or
security readiness for real-value use.
