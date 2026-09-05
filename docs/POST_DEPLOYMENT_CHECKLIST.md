# Post-deployment checklist

Complete this immediately after every public-testnet or mainnet deployment.

## Identity

- [ ] Record chain ID and network name.
- [ ] Record contract address and deployment transaction hash.
- [ ] Confirm explorer page is on the intended network.
- [ ] Confirm deployer and treasury addresses character by character.
- [ ] Record the Git commit and package lock hash used to compile.

## Bytecode and source

- [ ] Verify source code on the explorer.
- [ ] Confirm compiler 0.8.34.
- [ ] Confirm optimizer enabled with 200 runs.
- [ ] Confirm EVM target Cancun.
- [ ] Confirm constructor argument decodes to the intended treasury.
- [ ] Compare deployed bytecode with locally reproduced bytecode when supported.

## ERC-20 state

- [ ] `name()` returns `Xiao Coin`.
- [ ] `symbol()` returns `XIAO`.
- [ ] `decimals()` returns `18`.
- [ ] `totalSupply()` returns `1000000000000000000000000000` base units.
- [ ] Treasury initially holds the full supply.
- [ ] Deployer holds zero unless deployer is the treasury.
- [ ] No public `mint`, `owner`, `pause`, or blacklist function appears in the ABI.

## Functional smoke tests

- [ ] Transfer a very small testnet amount from treasury to a second address.
- [ ] Verify the Transfer event.
- [ ] Verify sender and recipient balances.
- [ ] Verify total supply did not change.
- [ ] Test approve and transferFrom with a minimal testnet amount if needed.

## Publication

- [ ] Publish one canonical contract address through controlled channels.
- [ ] State the network and chain ID next to the address.
- [ ] Configure the dashboard only after verification.
- [ ] Warn that names and symbols can be copied by third parties.
- [ ] Do not publish price, yield, or profit claims.
