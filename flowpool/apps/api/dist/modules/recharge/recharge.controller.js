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
exports.RechargeController = void 0;
const common_1 = require("@nestjs/common");
const recharge_service_1 = require("./recharge.service");
let RechargeController = class RechargeController {
    rechargeService;
    constructor(rechargeService) {
        this.rechargeService = rechargeService;
    }
    evaluate() { return this.rechargeService.evaluate(); }
    complete(id) { return this.rechargeService.complete(id); }
    list() { return this.rechargeService.list(); }
};
exports.RechargeController = RechargeController;
__decorate([
    (0, common_1.Post)("evaluate"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RechargeController.prototype, "evaluate", null);
__decorate([
    (0, common_1.Post)(":id/complete"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RechargeController.prototype, "complete", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RechargeController.prototype, "list", null);
exports.RechargeController = RechargeController = __decorate([
    (0, common_1.Controller)("recharge"),
    __metadata("design:paramtypes", [recharge_service_1.RechargeService])
], RechargeController);
//# sourceMappingURL=recharge.controller.js.map