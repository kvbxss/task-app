// auth.service.ts
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

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

      
      const token = await this.generateToken({ username: user.username });
      return token;
    } catch (error) {
      
      throw error;
    }
  }

  
  async login(username: string, password: string): Promise<string | null> {
    const user = await this.usersService.validateUser(username, password);

    if (user) {
      
      const token = await this.generateToken({ username: user.username });
      return token;
    }

    return null;
  }
}
