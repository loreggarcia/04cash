import { Injectable } from "@nestjs/common";
import { AppStateService } from "../../db/state.service";

@Injectable()
export class AccountsService {
  constructor(private readonly store: AppStateService) {}
  overview() { return this.store.authState(); }
}
