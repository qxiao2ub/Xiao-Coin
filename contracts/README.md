# Contracts

`XiaoCoin.sol` is the only production contract in version 0.1.0.

## Deliberate design constraints

- Fixed supply: 1,000,000,000 XIAO.
- Standard OpenZeppelin ERC-20 behavior.
- All tokens are minted once to the constructor treasury.
- No owner or administrator role.
- No post-deployment minting.
- No transfer tax, fee, reflection, rebasing, blacklist, or anti-bot logic.
- No proxy and no upgrade mechanism.
- Zero-address treasury deployments revert.

The small attack surface is intentional. Any future feature should be proposed,
reviewed, tested, and deployed as a separate contract rather than silently
changing the meaning of this token.
