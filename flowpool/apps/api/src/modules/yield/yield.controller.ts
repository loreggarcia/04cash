import { Controller, Get, Post } from "@nestjs/common";
import { YieldService } from "./yield.service";

@Controller("yield")
export class YieldController {
  constructor(private readonly yieldService: YieldService) {}
  @Post("simulate") simulate() { return this.yieldService.simulate(); }
  @Get("stats") stats() { return this.yieldService.stats(); }
}
