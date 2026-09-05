# Operations runbook

## Environments

1. Local Hardhat simulation.
2. Remix VM for interactive learning.
3. Base Sepolia public testnet.
4. Base mainnet only after release gates.

Never reuse a deployment record across chains.

## Key roles

- Developer: writes and tests code; should not unilaterally control production treasury.
- Deployer: signs the one-time contract creation transaction.
- Treasury signers: control token distribution after deployment.
- Reviewer: validates source, bytecode, chain, address, and parameters.
- Communications owner: publishes the canonical contract address.

For production, assign different people or controls where practical.

## Release procedure

1. Create a release branch and freeze dependencies.
2. Run all checks on a clean machine.
3. Obtain independent source and parameter review.
4. Record compiler, settings, commit, and lock-file hash.
5. Run a fresh Base Sepolia deployment and smoke test.
6. Complete legal, tax, accounting, treasury, and communications reviews.
7. Approve or reject the release in writing.
8. Sign and broadcast only after chain and address confirmation.
9. Verify explorer source immediately.
10. Publish the canonical address and deployment record.

## Incident procedure

Because XiaoCoin has no pause, blacklist, admin, or upgrade function, the contract
cannot freeze transfers or reverse transactions.

For a compromised website, repository, communications account, or treasury:

1. stop all planned transactions;
2. preserve logs and transaction hashes;
3. revoke compromised web credentials and rotate unaffected secrets;
4. warn users through independently controlled channels;
5. label affected addresses and publish facts without speculation;
6. consult security, legal, insurance, and law-enforcement professionals as appropriate;
7. do not promise recovery or reversal that the contract cannot perform.

## Treasury reconciliation

At a defined cadence:

- export balances and Transfer events;
- reconcile them to approved distribution records;
- investigate unexplained activity;
- publish a transparency report if the project represents that it does so;
- maintain tax and accounting records in USD at transaction time where required.
