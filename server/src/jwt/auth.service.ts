// auth.service.ts
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service"; // Assuming you have a UsersService

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async generateToken(payload: any): Promise<string> {
    console.log("Token Payload:", payload);
    return this.jwtService.sign(payload);
  }

  async validateToken(token: string): Promise<any> {
    try {
      const decodedToken = this.jwtService.verify(token);
      console.log("Decoded Token:", decodedToken);
      return decodedToken;
    } catch (error) {
      console.error("Token Verification Failed:", error);
      return null;
    }
  }

  async register(user: any): Promise<string> {
    try {
      await this.usersService.createUser(user);

      // Generate and return the JWT token for the registered user
      const token = await this.generateToken({ username: user.username });
      return token;
    } catch (error) {
      // Handle registration errors, e.g., if the username already exists
      throw error;
    }
  }

  // AuthService login method
  async login(username: string, password: string): Promise<string | null> {
    const user = await this.usersService.validateUser(username, password);

    if (user) {
      // Generate and return the JWT token for the authenticated user
      const token = await this.generateToken({ username: user.username });
      return token;
    }

    return null;
  }
}
