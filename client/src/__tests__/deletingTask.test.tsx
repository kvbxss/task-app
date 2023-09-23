import { fireEvent, render, screen } from "@testing-library/react";
import taskService from "../service/Api";
import React from "react";
import Task from "../components/Task";
import "@testing-library/jest-dom";

describe("Deleting a task", () => {
  test("should delete a task", async () => {
    const task = {
      id: 1,
      content: "Task to delete",
      done: false,
    };

    const remove = jest.fn().mockResolvedValue(task);
    (taskService.remove as jest.MockedFunction<typeof taskService.remove>) =
      remove;

    render(
      <Task
        task={{
          id: 0,
          content: "",
          done: false,
        }}
        handleDelete={function (id: number): void {
          throw new Error("Function not implemented.");
        }}
        handleUpdate={function (id: number, done: boolean): void {
          throw new Error("Function not implemented.");
        }}
      />
    );

    const deleteButton = screen.getByText("Delete");

    fireEvent.click(deleteButton);
    expect(screen.queryByText("Task to delete")).not.toBeInTheDocument();
  });
});
