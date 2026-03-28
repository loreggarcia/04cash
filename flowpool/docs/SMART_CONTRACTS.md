# Smart Contracts

- `PoolVault.sol`: account-level liquidity ledger and settlement surface
- `UsageSettlement.sol`: usage charge and batch charge events
- `AgentBudget.sol`: agent budget creation, top-up, spend, and pause controls
- `MockYieldStrategy.sol`: strategy funding, simulated yield, and harvest

## Deploy flow

1. Set `PRIVATE_KEY` and Monad RPC URL.
2. Run `forge script script/Deploy.s.sol --rpc-url $RPC --broadcast`.
3. Copy deployed addresses into `.env`.

## Tests

Run `forge test` from `contracts/` or `pnpm contracts:test` from the workspace root.
