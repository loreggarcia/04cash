import { Injectable } from "@nestjs/common";
import { AppStateService } from "../../db/state.service";

@Injectable()
export class UsersService {
  constructor(private readonly store: AppStateService) {}
  async me() { return (await this.store.authState()).user; }
}
