// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract UsageSettlement {
    event UsageCharged(uint256 indexed accountId, uint256 amount, bytes32 indexed usageType, bytes32 metadataHash);
    event UsageBatchCharged(uint256 indexed accountId, uint256 totalAmount, uint256 count);

    function chargeUsage(uint256 accountId, uint256 amount, bytes32 usageType, bytes32 metadataHash) external {
        emit UsageCharged(accountId, amount, usageType, metadataHash);
    }

    function batchChargeUsage(
        uint256 accountId,
        uint256[] calldata amounts,
        bytes32[] calldata usageTypes,
        bytes32[] calldata metadataHashes
    ) external {
        require(amounts.length == usageTypes.length && amounts.length == metadataHashes.length, "length mismatch");
        uint256 totalAmount;
        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
            emit UsageCharged(accountId, amounts[i], usageTypes[i], metadataHashes[i]);
        }
        emit UsageBatchCharged(accountId, totalAmount, amounts.length);
    }
}
