import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { X402Service } from "../adapters/x402/x402.service";
import { AppStateService } from "./state.service";

@Global()
@Module({
  providers: [PrismaService, X402Service, AppStateService],
  exports: [PrismaService, X402Service, AppStateService]
})
export class PrismaModule {}
