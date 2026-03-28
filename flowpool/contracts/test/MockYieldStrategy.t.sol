// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/MockYieldStrategy.sol";

contract MockYieldStrategyTest is Test {
    MockYieldStrategy strategy;

    function setUp() public {
      strategy = new MockYieldStrategy();
    }

    function testSimulateAndHarvestYield() public {
        strategy.depositToStrategy(100 ether);
        strategy.simulateYield(500);
        uint256 harvested = strategy.harvest();
        assertEq(harvested, 5 ether);
    }
}
