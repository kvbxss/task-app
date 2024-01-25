import { TasksController } from "./tasks/tasks.controller";
import { TasksService } from "./tasks/tasks.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./jwt/auth.controller";
import { AuthService } from "./jwt/auth.service";
import { Module } from "@nestjs/common";
import { AllExceptionsFilter } from "./error.filter";
import { APP_FILTER } from "@nestjs/core";

@Module({
  imports: [
    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn: "1h" },
    }),
  ],
  controllers: [TasksController, AuthController],
  providers: [
    TasksService,
    AuthService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
