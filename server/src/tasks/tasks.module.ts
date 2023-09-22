import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";

@Module({
  providers: [TasksController],
})
export class TasksModule {}
