// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/AgentBudget.sol";

contract AgentBudgetTest is Test {
    AgentBudget budget;
    address agent = address(0xBEEF);

    function setUp() public {
        budget = new AgentBudget();
    }

    function testCreateAndSpendBudget() public {
        budget.createAgentBudget(agent, 10 ether);
        budget.spendFromAgentBudget(agent, 3 ether);
        (uint256 limit, uint256 spent, bool paused) = budget.budgets(agent);
        assertEq(limit, 10 ether);
        assertEq(spent, 3 ether);
        assertEq(paused, false);
    }

    function testPauseAgent() public {
        budget.createAgentBudget(agent, 10 ether);
        budget.pauseAgent(agent);
        (, , bool paused) = budget.budgets(agent);
        assertEq(paused, true);
    }
}
