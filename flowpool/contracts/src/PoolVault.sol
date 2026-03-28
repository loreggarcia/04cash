// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PoolVault {
    struct AccountState {
        uint256 totalBalance;
        uint256 availableLiquidity;
        uint256 allocatedLiquidity;
        uint256 safetyReserve;
    }

    mapping(uint256 => AccountState) public accountStates;
    address public owner;

    event Deposited(uint256 indexed accountId, uint256 amount);
    event UsageSettled(uint256 indexed accountId, uint256 amount);
    event LiquidityAllocated(uint256 amount);
    event YieldReturned(uint256 amount, uint256 profit);
    event Withdrawn(uint256 indexed accountId, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function deposit(uint256 accountId, uint256 amount) external payable onlyOwner {
        require(amount > 0, "amount");
        AccountState storage state = accountStates[accountId];
        state.totalBalance += amount;
        state.availableLiquidity += amount;
        emit Deposited(accountId, amount);
    }

    function reserveForUsage(uint256 accountId, uint256 amount) external onlyOwner {
        AccountState storage state = accountStates[accountId];
        require(state.availableLiquidity >= amount, "insufficient available");
        state.availableLiquidity -= amount;
        state.allocatedLiquidity += amount;
    }

    function settleUsage(uint256 accountId, uint256 amount) external onlyOwner {
        AccountState storage state = accountStates[accountId];
        require(state.availableLiquidity >= amount, "insufficient liquidity");
        state.availableLiquidity -= amount;
        state.totalBalance -= amount;
        emit UsageSettled(accountId, amount);
    }

    function allocateToYield(uint256 amount) external onlyOwner {
        emit LiquidityAllocated(amount);
    }

    function returnYield(uint256 amount, uint256 profit) external onlyOwner {
        emit YieldReturned(amount, profit);
    }

    function withdraw(uint256 accountId, uint256 amount) external onlyOwner {
        AccountState storage state = accountStates[accountId];
        require(state.availableLiquidity >= amount, "insufficient available");
        state.availableLiquidity -= amount;
        state.totalBalance -= amount;
        emit Withdrawn(accountId, amount);
    }
}
