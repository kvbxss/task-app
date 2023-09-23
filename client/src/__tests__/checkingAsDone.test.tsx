import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Task from "../components/Task";

describe("Task component", () => {
  test("should render a task with done property set to true", () => {
    const task = {
      id: 1,
      content: "Task to check",
      done: true,
    };

    render(
      <Task
        task={task}
        handleDelete={function (id: number): void {
          throw new Error("Function not implemented.");
        }}
        handleUpdate={function (id: number, done: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeChecked();
  });
});
