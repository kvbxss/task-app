import { Module } from "@nestjs/common";
import { TasksController } from "./tasks/tasks.controller";
import { TasksService } from "./tasks/tasks.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./jwt/auth.controller";
import { JwtService } from "./jwt/auth.service";

@Module({
  imports: [
    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [TasksController, AuthController],
  providers: [TasksService, JwtService],
})
export class AppModule {}
