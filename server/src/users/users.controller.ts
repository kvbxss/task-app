// users.controller.ts
import {
  Controller,
  Post,
  Body,
  ConflictException,
  InternalServerErrorException,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserAlreadyExistsException } from "./exceptions/user-already-exists.exception";
import { User } from "./dtos/user.interface";
import { JwtAuthGuard } from "src/jwt/guards/jwt-auth.guard";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createUser(@Body() payload: User): Promise<void> {
    try {
      await this.usersService.createUser(payload);
    } catch (error) {
      switch (error.constructor) {
        case UserAlreadyExistsException:
          throw new ConflictException(error.message);
        default:
          throw new InternalServerErrorException(error.message);
      }
    }
  }
}
