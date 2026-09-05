# Xiao Coin whitepaper draft

**Document status:** concept draft for discussion. It is not an offering document,
contractual promise, token-sale announcement, or statement of current market availability.

## 1. Vision

Xiao Coin explores how a transparent blockchain token could support educational
achievements, access rights, community participation, and settlement inside a
future Xiao digital-learning and AI-application ecosystem.

## 2. Problem

Digital education and small AI applications often lack interoperable methods to
record participation, coordinate rewards, and recognize contributions across
projects. Conventional points are siloed and controlled by one database. Public
blockchain tokens offer portability and verifiability, but also introduce serious
security, governance, legal, privacy, and speculation risks.

## 3. Design principles

- Start with testnet and measurable utility.
- Keep the token contract simple and transparent.
- Separate software capability from economic and legal authorization.
- Publish one canonical contract address and verified source.
- Avoid hidden minting, taxes, blacklists, and administrator surprises.
- Do not promise price appreciation, redemption, yield, or liquidity.
- Use independent review before any real-value deployment.

## 4. Version 0.1.0 technology

XIAO is an ERC-20 token implemented with OpenZeppelin Contracts. A one-time
constructor mint creates 1,000,000,000 tokens with 18 decimals and assigns them
to a treasury. There is no owner, later minting, tax, pause, blacklist, or proxy.

Base Sepolia is the initial public test environment. The repository includes
Hardhat tests and deployment tooling, a Remix workflow, deployment records, and
a static non-custodial dashboard.

## 5. Potential utility research

Potential future experiments may include:

- non-monetary test rewards for completing AI learning modules;
- access credentials for educational content;
- transparent recognition of open-source project contributions;
- community voting in a separate, reviewed governance system;
- payment for clearly described digital services where legally permitted.

None of these utilities is implemented or promised by the version 0.1.0 token contract.

## 6. Supply

The contract supply is fixed at 1,000,000,000 XIAO. Fixed supply does not create
value or scarcity-based returns. Value, if any, depends on lawful utility,
security, adoption, governance, liquidity, and market behavior.

## 7. Treasury

The treasury receives the complete supply. Production use would require
multisignature controls, distribution policy, vesting where applicable,
accounting, conflicts disclosures, and transparent reporting.

## 8. Security

The project minimizes contract complexity and inherits a standard ERC-20
implementation. This lowers but does not eliminate risk. Production readiness
requires dependency freezing, automated and manual tests, independent review,
secure key operations, verified source, monitoring, and incident response.

## 9. Governance

No governance system exists in version 0.1.0. Any future governance should be
implemented separately, with clear powers, quorum, delegation, emergency limits,
and resistance to concentrated token control.

## 10. Roadmap

- Phase A: local contract tests and documentation.
- Phase B: Base Sepolia deployment and public technical demonstration.
- Phase C: prototype educational utility with no public sale.
- Phase D: independent security, legal, tax, and product review.
- Phase E: decision whether a mainnet token is appropriate at all.

## 11. Risks

Risks include total loss, no market or utility, regulatory restrictions, scams,
counterfeit tokens, key loss, software defects, network changes, treasury misuse,
and irreversible transactions. Users should not rely on this draft as a basis for investment.
