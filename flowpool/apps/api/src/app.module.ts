import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { PrismaModule } from "./db/prisma.module";
import { MockPixAdapter } from "./adapters/payment-rail/mock-pix.adapter";
import { OrdaAdapter } from "./adapters/payment-rail/orda.adapter";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { AccountsModule } from "./modules/accounts/accounts.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { LedgerModule } from "./modules/ledger/ledger.module";
import { PoolModule } from "./modules/pool/pool.module";
import { UsageModule } from "./modules/usage/usage.module";
import { RechargeModule } from "./modules/recharge/recharge.module";
import { AgentsModule } from "./modules/agents/agents.module";
import { YieldModule } from "./modules/yield/yield.module";
import { RealtimeModule } from "./modules/realtime/realtime.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    PrismaModule,
    AuthModule,
    UsersModule,
    AccountsModule,
    PaymentsModule,
    LedgerModule,
    PoolModule,
    UsageModule,
    RechargeModule,
    AgentsModule,
    YieldModule,
    RealtimeModule
  ],
  providers: [MockPixAdapter, OrdaAdapter]
})
export class AppModule {}
