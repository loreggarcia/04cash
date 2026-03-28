"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const event_emitter_1 = require("@nestjs/event-emitter");
const prisma_module_1 = require("./db/prisma.module");
const mock_pix_adapter_1 = require("./adapters/payment-rail/mock-pix.adapter");
const orda_adapter_1 = require("./adapters/payment-rail/orda.adapter");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const accounts_module_1 = require("./modules/accounts/accounts.module");
const payments_module_1 = require("./modules/payments/payments.module");
const ledger_module_1 = require("./modules/ledger/ledger.module");
const pool_module_1 = require("./modules/pool/pool.module");
const usage_module_1 = require("./modules/usage/usage.module");
const recharge_module_1 = require("./modules/recharge/recharge.module");
const agents_module_1 = require("./modules/agents/agents.module");
const yield_module_1 = require("./modules/yield/yield.module");
const realtime_module_1 = require("./modules/realtime/realtime.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            event_emitter_1.EventEmitterModule.forRoot(),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            accounts_module_1.AccountsModule,
            payments_module_1.PaymentsModule,
            ledger_module_1.LedgerModule,
            pool_module_1.PoolModule,
            usage_module_1.UsageModule,
            recharge_module_1.RechargeModule,
            agents_module_1.AgentsModule,
            yield_module_1.YieldModule,
            realtime_module_1.RealtimeModule
        ],
        providers: [mock_pix_adapter_1.MockPixAdapter, orda_adapter_1.OrdaAdapter]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map