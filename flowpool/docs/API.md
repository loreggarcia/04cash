# API

## Auth

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

## Payments

- `POST /api/payments/topup`
- `POST /api/payments/:id/confirm`
- `GET /api/payments`

## Pool

- `GET /api/pool/overview`
- `POST /api/pool/rebalance`
- `POST /api/pool/policy`

## Usage

- `POST /api/usage/api-call`
- `POST /api/usage/ai-call`
- `POST /api/usage/agent-task`
- `GET /api/usage/stats`
- `GET /api/usage/feed`

## Recharge

- `POST /api/recharge/evaluate`
- `POST /api/recharge/:id/complete`
- `GET /api/recharge`

## Agents

- `POST /api/agents`
- `POST /api/agents/:id/budget`
- `POST /api/agents/:id/run-task`
- `GET /api/agents`
- `GET /api/agents/:id`

## Yield

- `POST /api/yield/simulate`
- `GET /api/yield/stats`

## Ledger

- `GET /api/ledger`
- `GET /api/ledger/summary`
