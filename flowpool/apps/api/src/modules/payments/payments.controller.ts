import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateTopupDto } from "./dto";
import { PaymentsService } from "./payments.service";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  @Post("topup") createTopup(@Body() dto: CreateTopupDto) { return this.paymentsService.createTopup(dto.amount); }
  @Post(":id/confirm") confirmTopup(@Param("id") id: string) { return this.paymentsService.confirmTopup(id); }
  @Get() list() { return this.paymentsService.list(); }
}
