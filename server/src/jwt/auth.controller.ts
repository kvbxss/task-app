import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() user: any): Promise<any> {
    const token = await this.authService.generateToken({ sub: user.username });
    return { access_token: token };
  }
}
