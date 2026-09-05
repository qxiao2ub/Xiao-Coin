// SPDX-License-Identifier: MIT
pragma solidity 0.8.34;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title Xiao Coin (XIAO)
/// @author Dr. Qingyang Xiao
/// @notice A transparent, fixed-supply ERC-20 token intended for education,
///         prototyping, and future utility experiments in the Xiao ecosystem.
/// @dev The full supply is minted once to the treasury in the constructor.
///      This contract intentionally has no owner, no public mint function,
///      no transfer tax, no blacklist, no pause switch, and no upgrade proxy.
contract XiaoCoin is ERC20 {
    /// @notice Reverts when the deployment treasury is the zero address.
    error ZeroTreasuryAddress();

    /// @notice Human-readable fixed supply: 1,000,000,000 XIAO.
    /// @dev ERC-20 balances use 18 decimals, so the onchain integer is
    ///      1,000,000,000 * 10^18.
    uint256 public constant INITIAL_SUPPLY = 1_000_000_000 * 10 ** 18;

    /// @param treasury Address that receives the complete initial supply.
    constructor(address treasury) ERC20("Xiao Coin", "XIAO") {
        if (treasury == address(0)) {
            revert ZeroTreasuryAddress();
        }

        _mint(treasury, INITIAL_SUPPLY);
    }
}
