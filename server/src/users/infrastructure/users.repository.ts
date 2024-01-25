import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { User } from "../dtos/user.interface";

@Injectable()
export class UsersRepository {
  private users: User[] = [];

  async findByUsername(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async save(user: Partial<User>): Promise<void> {
    try {
      this.users.push(user as User);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
