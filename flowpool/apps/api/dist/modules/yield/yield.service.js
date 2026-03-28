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
Object.defineProperty(exports, "__esModule", { value: true });
exports.YieldService = void 0;
const common_1 = require("@nestjs/common");
const state_service_1 = require("../../db/state.service");
let YieldService = class YieldService {
    store;
    constructor(store) {
        this.store = store;
    }
    simulate() { return this.store.simulateYield(); }
    stats() { return this.store.getYieldStats(); }
};
exports.YieldService = YieldService;
exports.YieldService = YieldService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [state_service_1.AppStateService])
], YieldService);
//# sourceMappingURL=yield.service.js.map