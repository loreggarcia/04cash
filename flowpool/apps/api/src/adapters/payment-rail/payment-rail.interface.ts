export interface PaymentRailAdapter {
  createCharge(amount: number, metadata?: Record<string, unknown>): Promise<{
    externalRef: string;
    qrCodePayload: string;
    status: "pending";
  }>;
  getChargeStatus(externalRef: string): Promise<"pending" | "confirmed" | "failed">;
  confirmCharge(externalRef: string): Promise<"confirmed">;
}
