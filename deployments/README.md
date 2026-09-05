# Deployment records

The direct deployment script writes a machine-readable record named
`chain-<chainId>.json` here. Ignition keeps its own resumable deployment state
under `ignition/deployments/`.

Before publishing a deployment, independently compare:

1. Chain ID.
2. Contract address.
3. Deployment transaction hash.
4. Treasury address.
5. Verified source code and compiler settings.
6. Token name, symbol, decimals, and total supply.

Never infer a contract address from the token symbol. Symbols are not unique.
