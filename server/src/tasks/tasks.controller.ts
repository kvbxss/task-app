import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Put,
  Param,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(): Task[] {
    return this.tasksService.getTasks();
  }

  @Post()
  createTask(@Body() input: { content: string }): Task {
    return this.tasksService.createTask(input.content);
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string): void {
    this.tasksService.deleteTask(id);
  }

  @Put(":id")
  updateTask(
    @Param("id") id: string,
    @Body() input: { done: boolean },
  ): Task | null {
    return this.tasksService.updateTask(id, input.done);
  }
}
