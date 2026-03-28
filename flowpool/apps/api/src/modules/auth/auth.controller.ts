import { Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("login") login() { return this.authService.login(); }
  @Post("logout") logout() { return this.authService.logout(); }
  @Get("me") me() { return this.authService.me(); }
}
