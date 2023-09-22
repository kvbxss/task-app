import { Injectable } from "@nestjs/common";
import { Task } from "./task.entity";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  createTask(content: string): Task {
    const task: Task = {
      id: this.tasks.length + 1,
      content,
      done: false,
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(id, done: boolean): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      return null;
    }

    task.done = done;
    return task;
  }

  deleteTask(id): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
