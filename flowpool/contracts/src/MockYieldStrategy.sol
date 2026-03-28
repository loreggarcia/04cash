// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MockYieldStrategy {
    uint256 public strategyBalance;
    uint256 public simulatedProfit;

    event StrategyFunded(uint256 amount);
    event YieldSimulated(uint256 basisPoints, uint256 profit);
    event YieldHarvested(uint256 amount);

    function depositToStrategy(uint256 amount) external {
        strategyBalance += amount;
        emit StrategyFunded(amount);
    }

    function simulateYield(uint256 basisPoints) external {
        uint256 profit = (strategyBalance * basisPoints) / 10_000;
        simulatedProfit += profit;
        emit YieldSimulated(basisPoints, profit);
    }

    function harvest() external returns (uint256 harvested) {
        harvested = simulatedProfit;
        simulatedProfit = 0;
        emit YieldHarvested(harvested);
    }
}
