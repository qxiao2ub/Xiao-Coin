# Security checklist

## Source and dependencies

- [ ] Pin compiler and EVM target.
- [ ] Generate, review, and commit `package-lock.json`.
- [ ] Run `npm audit` and evaluate findings rather than blindly applying changes.
- [ ] Review OpenZeppelin release notes before upgrades.
- [ ] Require CI on every pull request.
- [ ] Tag the exact release commit.

## Keys

- [ ] Use a dedicated deployment wallet.
- [ ] Never commit private keys, phrases, passwords, or API secrets.
- [ ] Use Hardhat keystore or a hardware wallet workflow.
- [ ] Keep treasury and deployer roles separate for production.
- [ ] Use a reviewed multisignature treasury for real value.
- [ ] Test recovery and signer rotation procedures before funding.

## Deployment

- [ ] Independently verify chain ID.
- [ ] Independently verify treasury address.
- [ ] Run gas simulation and do not force-send failed simulations.
- [ ] Start on a local chain, then Base Sepolia.
- [ ] Verify explorer source and constructor arguments.
- [ ] Preserve transaction and deployment records.

## Contract

- [ ] No unreviewed feature additions.
- [ ] No hidden mint or owner capability.
- [ ] No tax, blacklist, pause, proxy, or arbitrary external calls.
- [ ] Standard ERC-20 behavior covered by tests.
- [ ] Independent review completed against the exact release commit.

## Website

- [ ] Pin third-party script versions.
- [ ] Maintain a restrictive Content Security Policy.
- [ ] Display chain ID and exact contract address.
- [ ] Do not request recovery phrases or private keys.
- [ ] Explain every transaction before requesting a signature.
- [ ] Publish no misleading price, yield, urgency, or guaranteed-return claims.

## Operations

- [ ] Monitor official channels for impersonation and fake contract addresses.
- [ ] Publish incident response contacts and status updates.
- [ ] Reconcile treasury activity with accounting records.
- [ ] Keep a signed release checklist and approval trail.
