// auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "src/users/dtos/user.interface";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() user: User): Promise<{ token: string }> {
    try {
      const token = await this.authService.register(user);
      return { token };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException("User with this username already exists");
      }
      throw new UnauthorizedException("Registration failed");
    }
  }

  @Post("login")
  async login(@Body() user: User): Promise<{ token: string }> {
    const { username, password } = user;
    const token = await this.authService.login(username, password);

    if (token === null) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return { token };
  }
}
