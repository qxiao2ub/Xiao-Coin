# Threat model

## Assets

- Deployment private key.
- Treasury signing authority.
- Fixed XIAO supply.
- Canonical contract address and official communications.
- Source repository and GitHub release integrity.
- User wallet approvals and transfers.

## Threat actors

- External attackers seeking private keys or repository access.
- Impersonators publishing a fake XIAO token with the same name and symbol.
- Malicious or compromised dependency publishers.
- Insiders misusing treasury access.
- Users or operators making chain, address, or amount mistakes.
- Phishing sites imitating Remix, MetaMask, faucets, explorers, or the dashboard.

## Primary risks and mitigations

### Key theft

Mitigations: dedicated wallet, encrypted keystore or hardware signer, no plaintext
secrets, minimal balances, multisignature treasury, protected backups.

### Wrong-network deployment

Mitigations: chain ID assertions, Base Sepolia preflight, direct-script mainnet
block, manual review in wallet, deployment record.

### Wrong treasury

Mitigations: zero-address check, checksum normalization, two-person verification,
parameter review, small-value dry run.

### Counterfeit token

Mitigations: publish the full contract address with chain ID, verified source,
canonical repository, signed releases, and clear warnings that symbols are not unique.

### Supply manipulation

Mitigations: no public or privileged mint, no proxy, fixed constructor mint,
automated ABI and supply tests.

### Frontend compromise

Mitigations: static hosting, narrow ABI, no key custody, CSP, pinned library,
transparent transaction preview, reproducible source, separate explorer verification.

### Dependency compromise

Mitigations: lock file, dependency review, CodeQL, update review, release freeze,
bytecode reproduction, independent audit.

### Treasury misuse

The token contract cannot prevent the treasury holder from transferring treasury
balances. Mitigations must therefore be operational: multisignature approvals,
vesting contracts, documented policy, public reporting, and legal/accounting controls.

## Residual risk

Even with these controls, blockchain transactions are generally irreversible,
wallets and infrastructure can fail, regulations can change, and smart-contract
review cannot guarantee the absence of every defect.
