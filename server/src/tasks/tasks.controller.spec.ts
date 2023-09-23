import { Test, TestingModule } from "@nestjs/testing";
import { HttpStatus, INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";

describe("TasksController", () => {
  let app: INestApplication;
  let tasksService: TasksService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            getTasks: jest.fn(),
            createTask: jest.fn(),
            deleteTask: jest.fn(),
            updateTask: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    tasksService = moduleFixture.get<TasksService>(TasksService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe("GET /tasks", () => {
    it("should return an array of tasks", async () => {
      jest.spyOn(tasksService, "getTasks");

      const response = await request(app.getHttpServer()).get("/tasks");

      expect(response.status).toBe(HttpStatus.OK);
    });
  });

  describe("POST /tasks", () => {
    it("should create a new task", async () => {
      jest.spyOn(tasksService, "createTask");

      const response = await request(app.getHttpServer())
        .post("/tasks")
        .send({ content: "New task" });

      expect(response.status).toBe(HttpStatus.CREATED);
    });

    it("should return a 400 error for invalid input", async () => {
      const response = await request(app.getHttpServer())
        .post("/tasks")
        .send({ content: "" });

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe("DELETE /tasks/:id", () => {
    it("should delete an existing task", async () => {
      jest.spyOn(tasksService, "deleteTask");

      const response = await request(app.getHttpServer()).delete("/tasks/1");

      expect(response.status).toBe(HttpStatus.OK);
    });

    it("should return a 400 error for invalid ID", async () => {
      const response = await request(app.getHttpServer()).delete("/tasks/abc");

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe("PUT /tasks/:id", () => {
    it("should update an existing task", async () => {
      jest.spyOn(tasksService, "updateTask");

      const response = await request(app.getHttpServer())
        .put("/tasks/1")
        .send({ done: true });

      expect(response.status).toBe(HttpStatus.OK);
    });

    it("should return a 400 error for invalid ID", async () => {
      const response = await request(app.getHttpServer())
        .put("/tasks/abc")
        .send({ done: true });

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

    it("should return a 400 error for invalid input", async () => {
      const response = await request(app.getHttpServer())
        .put("/tasks/1")
        .send({ done: "true" });

      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });
});
