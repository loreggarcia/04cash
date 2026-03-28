import { Controller, Sse } from "@nestjs/common";
import { Observable } from "rxjs";
import { RealtimeService } from "./realtime.service";

@Controller("realtime")
export class RealtimeController {
  constructor(private readonly realtimeService: RealtimeService) {}
  @Sse("events") events(): Observable<{ data: string }> { return this.realtimeService.stream(); }
}
