"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildX402Context = buildX402Context;
function buildX402Context(payload) {
    return {
        requestId: `req_${Date.now()}`,
        endpoint: payload.endpoint,
        consumer: payload.consumer,
        units: payload.units,
        cost: payload.cost,
        metadata: {
            settlementRail: "flowpool-mock",
            pricingMode: "pay-per-request"
        }
    };
}
//# sourceMappingURL=x402.mock.js.map