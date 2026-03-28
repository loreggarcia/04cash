import { Body, Controller, Get, Post } from "@nestjs/common";
import { UpdatePoolPolicyDto } from "./dto";
import { PoolService } from "./pool.service";

@Controller("pool")
export class PoolController {
  constructor(private readonly poolService: PoolService) {}
  @Get("overview") overview() { return this.poolService.overview(); }
  @Post("rebalance") rebalance(@Body() dto: UpdatePoolPolicyDto) { return this.poolService.rebalance(dto.policyMode); }
  @Post("policy") policy(@Body() dto: UpdatePoolPolicyDto) { return this.poolService.rebalance(dto.policyMode); }
}
