import { Controller, Get, Param, Post } from "@nestjs/common";
import { RechargeService } from "./recharge.service";

@Controller("recharge")
export class RechargeController {
  constructor(private readonly rechargeService: RechargeService) {}
  @Post("evaluate") evaluate() { return this.rechargeService.evaluate(); }
  @Post(":id/complete") complete(@Param("id") id: string) { return this.rechargeService.complete(id); }
  @Get() list() { return this.rechargeService.list(); }
}
