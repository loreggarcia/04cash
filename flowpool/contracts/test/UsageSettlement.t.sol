// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/UsageSettlement.sol";

contract UsageSettlementTest is Test {
    UsageSettlement settlement;

    function setUp() public {
        settlement = new UsageSettlement();
    }

    function testChargeUsage() public {
        settlement.chargeUsage(1, 1 ether, bytes32("api_call"), keccak256("meta"));
    }

    function testBatchChargeUsage() public {
        uint256[] memory amounts = new uint256[](2);
        amounts[0] = 1 ether;
        amounts[1] = 2 ether;
        bytes32[] memory usageTypes = new bytes32[](2);
        usageTypes[0] = bytes32("api_call");
        usageTypes[1] = bytes32("agent_task");
        bytes32[] memory metadataHashes = new bytes32[](2);
        metadataHashes[0] = keccak256("a");
        metadataHashes[1] = keccak256("b");
        settlement.batchChargeUsage(1, amounts, usageTypes, metadataHashes);
    }
}
