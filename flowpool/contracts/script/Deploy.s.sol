// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/PoolVault.sol";
import "../src/UsageSettlement.sol";
import "../src/AgentBudget.sol";
import "../src/MockYieldStrategy.sol";

contract DeployScript is Script {
    function run() external {
        uint256 privateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(privateKey);

        PoolVault poolVault = new PoolVault();
        UsageSettlement usageSettlement = new UsageSettlement();
        AgentBudget agentBudget = new AgentBudget();
        MockYieldStrategy yieldStrategy = new MockYieldStrategy();

        console2.log("PoolVault", address(poolVault));
        console2.log("UsageSettlement", address(usageSettlement));
        console2.log("AgentBudget", address(agentBudget));
        console2.log("MockYieldStrategy", address(yieldStrategy));

        vm.stopBroadcast();
    }
}
