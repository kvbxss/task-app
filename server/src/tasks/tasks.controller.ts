import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Put,
  Param,
  HttpException,
  HttpStatus,
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
    if (typeof input.content !== "string" || input.content.length === 0) {
      throw new HttpException(
        "Content must be a non-empty string",
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.tasksService.createTask(input.content);
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string): void {
    if (!/^\d+$/.test(id)) {
      throw new HttpException("Id must be a number", HttpStatus.BAD_REQUEST);
    }
    this.tasksService.deleteTask(id);
  }

  @Put(":id")
  updateTask(@Param("id") id: string, @Body() input: { done: boolean }): Task {
    if (!/^\d+$/.test(id)) {
      throw new HttpException("Id must be a number", HttpStatus.BAD_REQUEST);
    }
    if (typeof input.done !== "boolean") {
      throw new HttpException("Done must be a boolean", HttpStatus.BAD_REQUEST);
    }
    return this.tasksService.updateTask(id, input.done);
  }
}
