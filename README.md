# FlowPool

FlowPool is a programmable liquidity operating system built for Monad Testnet. The project simulates how fiat inflows such as Pix can be converted into onchain liquidity that funds API usage, AI agents, auto-recharge flows, and yield strategies in a single product experience.

## What the project includes

- A web app for wallet connection, deposits, dashboard monitoring, pool activity, usage tracking, and demo actions
- A NestJS API that exposes accounts, pool, usage, payments, recharge, ledger, yield, realtime, and agents modules
- Solidity contracts for pool vaults, budget controls, settlement, and mocked yield behavior
- Shared workspace packages for UI primitives, SDK helpers, and project types

## Tech stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion, Recharts, Wagmi, Viem
- Backend: NestJS, Prisma, PostgreSQL, Redis, BullMQ, Server-Sent Events
- Smart contracts: Solidity, Foundry
- Tooling: pnpm workspaces, Corepack

## Repository structure

```text
flowpool/
  apps/
    api/        NestJS backend
    web/        Next.js frontend
  contracts/    Solidity contracts and Foundry config
  packages/
    sdk/        Shared client helpers
    types/      Shared TypeScript types
    ui/         Shared UI exports
  docs/         Product, setup, API, architecture, and demo docs
  scripts/      Local dev and seed scripts
```

## Core flows

- Connect a wallet on Monad Testnet
- Simulate Pix top-ups and account funding
- Allocate balance to pool liquidity
- Track usage spend and agent budgets
- Trigger auto-recharge and yield simulation
- Observe realtime dashboard and ledger updates

## Local setup

### Requirements

- Node.js 20+
- pnpm 10+
- PostgreSQL 15+
- Redis 7+
- Foundry

### Install and run

```bash
cd flowpool
corepack pnpm install
cp .env.example .env
cp .env.example apps/api/.env
corepack pnpm --filter @flowpool/api prisma:generate
corepack pnpm db:push
corepack pnpm seed
corepack pnpm dev
```

This starts:

- `@flowpool/web` in development mode
- `@flowpool/api` in watch mode

## Useful scripts

```bash
corepack pnpm dev
corepack pnpm dev:web
corepack pnpm dev:api
corepack pnpm build
corepack pnpm lint
corepack pnpm test
corepack pnpm db:push
corepack pnpm seed
corepack pnpm contracts:build
corepack pnpm contracts:test
```

## Smart contracts

The contracts workspace contains the onchain primitives used in the demo:

- `PoolVault.sol`
- `UsageSettlement.sol`
- `AgentBudget.sol`
- `MockYieldStrategy.sol`

To build and test locally:

```bash
cd flowpool
corepack pnpm contracts:build
corepack pnpm contracts:test
```

## Demo walkthrough

1. Open the landing page and enter the app.
2. Connect a wallet and switch to Monad Testnet.
3. Create a mock Pix top-up on `/add-funds`.
4. Confirm the payment and inspect the dashboard updates.
5. Trigger usage, agent, recharge, and yield flows.
6. Submit an onchain pool deposit from the dashboard or pool page.

For the exact demo script, see [DEMO_FLOW.md](/home/lorena/Blitz-Monad/flowpool/docs/DEMO_FLOW.md).

## Documentation

- [SETUP.md](/home/lorena/Blitz-Monad/flowpool/docs/SETUP.md)
- [ARCHITECTURE.md](/home/lorena/Blitz-Monad/flowpool/docs/ARCHITECTURE.md)
- [PRODUCT.md](/home/lorena/Blitz-Monad/flowpool/docs/PRODUCT.md)
- [FRONTEND.md](/home/lorena/Blitz-Monad/flowpool/docs/FRONTEND.md)
- [BACKEND.md](/home/lorena/Blitz-Monad/flowpool/docs/BACKEND.md)
- [API.md](/home/lorena/Blitz-Monad/flowpool/docs/API.md)
- [SMART_CONTRACTS.md](/home/lorena/Blitz-Monad/flowpool/docs/SMART_CONTRACTS.md)
- [README_DEMO.md](/home/lorena/Blitz-Monad/flowpool/README_DEMO.md)
- [DELIVERY_CHECKLIST.md](/home/lorena/Blitz-Monad/flowpool/DELIVERY_CHECKLIST.md)
