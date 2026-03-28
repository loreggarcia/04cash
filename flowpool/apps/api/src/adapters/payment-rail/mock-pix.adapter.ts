import { Injectable } from "@nestjs/common";
import { PaymentRailAdapter } from "./payment-rail.interface";

@Injectable()
export class MockPixAdapter implements PaymentRailAdapter {
  private readonly status = new Map<string, "pending" | "confirmed" | "failed">();

  async createCharge(amount: number) {
    const externalRef = `PIX-${Math.floor(1000 + Math.random() * 9000)}`;
    this.status.set(externalRef, "pending");
    return { externalRef, qrCodePayload: `mock-pix://${externalRef}/${amount}`, status: "pending" as const };
  }

  async getChargeStatus(externalRef: string) {
    return this.status.get(externalRef) ?? "failed";
  }

  async confirmCharge(externalRef: string) {
    this.status.set(externalRef, "confirmed");
    return "confirmed" as const;
  }
}
