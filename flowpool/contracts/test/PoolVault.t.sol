// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/PoolVault.sol";

contract PoolVaultTest is Test {
    PoolVault vault;

    function setUp() public {
        vault = new PoolVault();
    }

    function testDepositUpdatesAccountState() public {
        vault.deposit(1, 10 ether);
        (uint256 totalBalance, uint256 availableLiquidity, , ) = vault.accountStates(1);
        assertEq(totalBalance, 10 ether);
        assertEq(availableLiquidity, 10 ether);
    }

    function testSettleUsageDebitsLiquidity() public {
        vault.deposit(1, 5 ether);
        vault.settleUsage(1, 2 ether);
        (uint256 totalBalance, uint256 availableLiquidity, , ) = vault.accountStates(1);
        assertEq(totalBalance, 3 ether);
        assertEq(availableLiquidity, 3 ether);
    }
}
