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
      id: new Date().getTime(),
      content,
      done: false,
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, done: boolean): Task {
    const task = this.tasks.find((task) => task.id === parseInt(id));

    if (!task) {
      return null;
    }

    task.done = done;
    return task;
  }

  deleteTask(id: string): Task[] {
    const index = this.tasks.findIndex((task) => task.id === parseInt(id));

    if (index !== -1) {
      this.tasks.splice(index, 1);
    }

    return this.tasks;
  }
}
