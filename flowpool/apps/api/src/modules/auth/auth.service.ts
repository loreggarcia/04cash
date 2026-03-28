import { Injectable } from "@nestjs/common";
import { AppStateService } from "../../db/state.service";

@Injectable()
export class AuthService {
  constructor(private readonly store: AppStateService) {}
  login() { return this.store.authState(); }
  logout() { return { success: true }; }
  me() { return this.store.authState(); }
}
