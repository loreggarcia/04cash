export const poolVaultAbi = [
  {
    type: "function",
    name: "deposit",
    stateMutability: "nonpayable",
    inputs: [
      { name: "accountId", type: "uint256" },
      { name: "amount", type: "uint256" }
    ],
    outputs: []
  }
] as const;
