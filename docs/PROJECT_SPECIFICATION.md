# Project specification

## Purpose

Xiao Coin version 0.1.0 is a transparent ERC-20 prototype for education,
software demonstrations, and future utility experiments. It is not a
stablecoin, deposit, security offering, investment product, payment promise, or
claim on treasury assets.

## Authoritative technical requirements

1. Name: Xiao Coin.
2. Symbol: XIAO.
3. Decimals: 18.
4. Human supply: 1,000,000,000 XIAO.
5. Supply created only once, in the constructor.
6. Entire supply delivered to a nonzero treasury address.
7. No public or privileged mint function after deployment.
8. No owner or administrator role.
9. No transfer tax, reflection, rebasing, blacklist, whitelist, pause, or
   anti-bot logic.
10. No upgradeable proxy.
11. Standard ERC-20 transfer, allowance, and transferFrom behavior.
12. Base Sepolia is the first intended public deployment environment.
13. Base mainnet deployment is prohibited until all release gates are complete.

## Non-goals for version 0.1.0

- Creating a new layer-1 blockchain.
- Maintaining a one-dollar peg.
- Running a token sale or crowdfunding campaign.
- Providing exchange, custody, bridging, staking, yield, or lending services.
- Guaranteeing price, liquidity, redemption, profit, or market access.
- Implementing governance or hidden administrative intervention.

## Acceptance criteria

- Contract compiles with the pinned compiler and target EVM version.
- Automated tests pass.
- Static checks find no obvious secret or forbidden feature pattern.
- Local deployment and transfers work.
- Base Sepolia preflight passes before deployment.
- Explorer source verification matches the repository commit.
- Onchain metadata and supply match this document exactly.
