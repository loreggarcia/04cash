import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AgentsService } from "./agents.service";
import { CreateAgentDto, RunAgentTaskDto, UpdateBudgetDto } from "./dto";

@Controller("agents")
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}
  @Post() create(@Body() dto: CreateAgentDto) { return this.agentsService.create(dto); }
  @Post(":id/budget") budget(@Param("id") id: string, @Body() dto: UpdateBudgetDto) { return this.agentsService.budget(id, dto.amount); }
  @Post(":id/run-task") runTask(@Param("id") id: string, @Body() dto: RunAgentTaskDto) { return this.agentsService.runTask(id, dto.taskType, dto.cost); }
  @Get() list() { return this.agentsService.list(); }
  @Get(":id") get(@Param("id") id: string) { return this.agentsService.get(id); }
}
