import { Test, TestingModule } from "@nestjs/testing";
import { TasksController } from "./tasks.controller";

describe("TasksController", () => {
  let resolver: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksController],
    }).compile();

    resolver = module.get<TasksController>(TasksController);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
