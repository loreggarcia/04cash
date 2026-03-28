# Setup

## Requirements

- Node.js 20+
- pnpm 10+
- PostgreSQL 15+
- Redis 7+
- Foundry

## Local

```bash
cp .env.example .env
cp .env.example apps/api/.env
corepack pnpm install
corepack pnpm --filter @flowpool/api prisma:generate
corepack pnpm db:push
corepack pnpm seed
corepack pnpm dev
```

## Contracts

```bash
cd contracts
forge build
forge test
```

## Notes

- The app runs end-to-end with `MockPixAdapter`.
- `OrdaAdapter` is included as an integration-ready stub.
- Realtime updates are exposed through SSE.
- `prisma db push` is the supported local bootstrap path for the current demo stack.
