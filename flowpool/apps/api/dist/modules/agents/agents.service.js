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
exports.AgentsService = void 0;
const common_1 = require("@nestjs/common");
const state_service_1 = require("../../db/state.service");
let AgentsService = class AgentsService {
    store;
    constructor(store) {
        this.store = store;
    }
    create(payload) { return this.store.createAgent(payload); }
    budget(id, amount) { return this.store.topUpAgentBudget(id, amount); }
    runTask(id, taskType, cost) { return this.store.runAgentTask(id, taskType, cost); }
    list() { return this.store.listAgents(); }
    get(id) { return this.store.getAgent(id); }
};
exports.AgentsService = AgentsService;
exports.AgentsService = AgentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [state_service_1.AppStateService])
], AgentsService);
//# sourceMappingURL=agents.service.js.map