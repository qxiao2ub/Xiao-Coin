# Base mainnet release gates

A working Base Sepolia deployment is not sufficient justification for mainnet.
Every gate below should have named owners, evidence, and written approval.

## Gate 1: product purpose

- A real, documented utility exists beyond speculative trading.
- User flows, disclosures, support, and complaint handling are defined.
- No misleading urgency, profit, price, or guaranteed-liquidity claim exists.

## Gate 2: legal and regulatory review

- Qualified counsel reviews token rights, distribution, marketing, purchasers,
  jurisdictions, sanctions, AML, money-transmission, consumer, privacy, and securities issues.
- Tax and accounting treatment are documented.
- Any required entity, registration, license, terms, privacy policy, and risk
  disclosure are complete.

## Gate 3: security

- Exact release commit is frozen.
- Lock file is committed and dependency graph reviewed.
- Automated tests and static analysis pass.
- Independent smart-contract review or audit covers exact compiler settings.
- Findings are resolved or explicitly accepted by accountable owners.
- Explorer verification and bytecode reproduction are rehearsed.

## Gate 4: treasury and governance

- Treasury is a reviewed multisignature, not an ordinary browser hot wallet.
- Signers, quorum, recovery, conflicts, and transaction-approval policy are documented.
- Allocation and vesting are implemented and reviewed.
- Accounting and public transparency processes are operational.

## Gate 5: deployment operations

- Deployer is dedicated and minimally funded.
- Chain ID and treasury are independently verified.
- A complete testnet rehearsal succeeds from a clean environment.
- Incident communications and monitoring are ready.
- Canonical address publication is controlled.

## Gate 6: explicit final authorization

The included `npm run deploy:base-mainnet` command remains blocked unless four
explicit environment acknowledgements are provided and a reviewed mainnet
parameter file exists. These software checks are only reminders; they do not
prove legal or security readiness.
