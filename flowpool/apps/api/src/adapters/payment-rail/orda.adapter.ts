import { Injectable } from "@nestjs/common";
import { PaymentRailAdapter } from "./payment-rail.interface";

@Injectable()
export class OrdaAdapter implements PaymentRailAdapter {
  async createCharge(amount: number) {
    return { externalRef: `ORDA-TODO-${Date.now()}`, qrCodePayload: `orda://charge/${amount}`, status: "pending" as const };
  }

  async getChargeStatus() {
    return "pending" as const;
  }

  async confirmCharge() {
    return "confirmed" as const;
  }
}
