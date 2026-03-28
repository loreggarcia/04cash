// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract AgentBudget {
    struct Budget {
        uint256 limit;
        uint256 spent;
        bool paused;
    }

    mapping(address => Budget) public budgets;
    address public owner;

    event AgentBudgetCreated(address indexed agent, uint256 limit);
    event AgentBudgetToppedUp(address indexed agent, uint256 amount);
    event AgentSpent(address indexed agent, uint256 amount);
    event AgentPaused(address indexed agent);

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createAgentBudget(address agent, uint256 limit) external onlyOwner {
        budgets[agent] = Budget({limit: limit, spent: 0, paused: false});
        emit AgentBudgetCreated(agent, limit);
    }

    function topUpAgentBudget(address agent, uint256 amount) external onlyOwner {
        budgets[agent].limit += amount;
        emit AgentBudgetToppedUp(agent, amount);
    }

    function spendFromAgentBudget(address agent, uint256 amount) external onlyOwner {
        Budget storage budget = budgets[agent];
        require(!budget.paused, "paused");
        require(budget.spent + amount <= budget.limit, "limit exceeded");
        budget.spent += amount;
        emit AgentSpent(agent, amount);
    }

    function pauseAgent(address agent) external onlyOwner {
        budgets[agent].paused = true;
        emit AgentPaused(agent);
    }
}
