import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Observable } from "rxjs";

@Injectable()
export class RealtimeService {
  constructor(private readonly events: EventEmitter2) {}
  stream(): Observable<{ data: string }> {
    return new Observable<{ data: string }>((subscriber) => {
      const handler = (event: unknown) => subscriber.next({ data: JSON.stringify(event) });
      this.events.on("realtime.event", handler);
      return () => this.events.off("realtime.event", handler);
    });
  }
}
