import { Injectable } from "@nestjs/common";
import { buildX402Context } from "./x402.mock";

@Injectable()
export class X402Service {
  enrichUsage(payload: { endpoint: string; consumer: string; units: number; cost: number }) {
    return buildX402Context(payload);
  }
}
