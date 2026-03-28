"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.X402Service = void 0;
const common_1 = require("@nestjs/common");
const x402_mock_1 = require("./x402.mock");
let X402Service = class X402Service {
    enrichUsage(payload) {
        return (0, x402_mock_1.buildX402Context)(payload);
    }
};
exports.X402Service = X402Service;
exports.X402Service = X402Service = __decorate([
    (0, common_1.Injectable)()
], X402Service);
//# sourceMappingURL=x402.service.js.map