# Architecture

FlowPool is split across four layers:

1. Web app: Next.js App Router UI, wallet integration, charts, and live dashboards.
2. API: NestJS modules for payments, pool state, ledger, usage, recharge, agents, yield, and realtime streams.
3. Data: Prisma schema targeting PostgreSQL, Redis-backed BullMQ jobs, event fan-out through Nest event emitter and SSE.
4. Onchain: Foundry contracts for vault, usage settlement, agent budgets, and mock yield strategy.

## Data flow

Pix charge created -> payment confirmed -> ledger credit -> pool allocation -> usage and agent debits -> recharge evaluation -> yield accrual -> realtime event push -> dashboard updates.
