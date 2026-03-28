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
exports.UsageController = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const usage_service_1 = require("./usage.service");
let UsageController = class UsageController {
    usageService;
    constructor(usageService) {
        this.usageService = usageService;
    }
    apiCall(dto) { return this.usageService.apiCall(dto.units, dto.unitCost, dto.sourceName); }
    aiCall(dto) { return this.usageService.aiCall(dto.units, dto.unitCost, dto.sourceName); }
    agentTask(dto) { return this.usageService.agentTask(dto.units, dto.unitCost, dto.sourceName); }
    stats() { return this.usageService.stats(); }
    feed() { return this.usageService.feed(); }
};
exports.UsageController = UsageController;
__decorate([
    (0, common_1.Post)("api-call"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUsageDto]),
    __metadata("design:returntype", void 0)
], UsageController.prototype, "apiCall", null);
__decorate([
    (0, common_1.Post)("ai-call"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUsageDto]),
    __metadata("design:returntype", void 0)
], UsageController.prototype, "aiCall", null);
__decorate([
    (0, common_1.Post)("agent-task"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateUsageDto]),
    __metadata("design:returntype", void 0)
], UsageController.prototype, "agentTask", null);
__decorate([
    (0, common_1.Get)("stats"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsageController.prototype, "stats", null);
__decorate([
    (0, common_1.Get)("feed"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsageController.prototype, "feed", null);
exports.UsageController = UsageController = __decorate([
    (0, common_1.Controller)("usage"),
    __metadata("design:paramtypes", [usage_service_1.UsageService])
], UsageController);
//# sourceMappingURL=usage.controller.js.map