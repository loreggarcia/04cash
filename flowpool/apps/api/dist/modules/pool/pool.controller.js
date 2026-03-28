"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoolController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const pool_service_1 = require("./pool.service");
let PoolController = class PoolController {
    poolService;
    constructor(poolService) {
        this.poolService = poolService;
    }
    overview() { return this.poolService.overview(); }
    rebalance(dto) { return this.poolService.rebalance(dto.policyMode); }
    policy(dto) { return this.poolService.rebalance(dto.policyMode); }
};
exports.PoolController = PoolController;
__decorate([
    (0, common_1.Get)("overview"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PoolController.prototype, "overview", null);
__decorate([
    (0, common_1.Post)("rebalance"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdatePoolPolicyDto]),
    __metadata("design:returntype", void 0)
], PoolController.prototype, "rebalance", null);
__decorate([
    (0, common_1.Post)("policy"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpdatePoolPolicyDto]),
    __metadata("design:returntype", void 0)
], PoolController.prototype, "policy", null);
exports.PoolController = PoolController = __decorate([
    (0, common_1.Controller)("pool"),
    __metadata("design:paramtypes", [pool_service_1.PoolService])
], PoolController);
//# sourceMappingURL=pool.controller.js.map