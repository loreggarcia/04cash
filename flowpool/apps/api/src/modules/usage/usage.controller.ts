import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUsageDto } from "./dto";
import { UsageService } from "./usage.service";

@Controller("usage")
export class UsageController {
  constructor(private readonly usageService: UsageService) {}
  @Post("api-call") apiCall(@Body() dto: CreateUsageDto) { return this.usageService.apiCall(dto.units, dto.unitCost, dto.sourceName); }
  @Post("ai-call") aiCall(@Body() dto: CreateUsageDto) { return this.usageService.aiCall(dto.units, dto.unitCost, dto.sourceName); }
  @Post("agent-task") agentTask(@Body() dto: CreateUsageDto) { return this.usageService.agentTask(dto.units, dto.unitCost, dto.sourceName); }
  @Get("stats") stats() { return this.usageService.stats(); }
  @Get("feed") feed() { return this.usageService.feed(); }
}
