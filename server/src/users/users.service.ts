// users.service.ts
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./infrastructure/users.repository";
import { UserAlreadyExistsException } from "./exceptions/user-already-exists.exception";
import { User } from "./dtos/user.interface";
import { hash, compare } from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(payload: User): Promise<void> {
    const userExists = await this.usersRepository.findByUsername(
      payload.username
    );

    if (userExists) {
      throw new UserAlreadyExistsException(
        "User with this username already exists"
      );
    }

    
    const hashedPassword = await hash(payload.password, 10);
    await this.usersRepository.save({
      ...payload,
      password: hashedPassword,
    });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findByUsername(username);

    if (user) {
      const passwordMatch = await compare(password, user.password);

      console.log("User:", user);
      console.log("Password Match:", passwordMatch);

      if (passwordMatch) {
        return user;
      }
    }

    return null;
  }
}
