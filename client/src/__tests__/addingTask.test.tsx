import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import taskService from "../service/Api";
import React from "react";
import "@testing-library/jest-dom";

describe("Adding a new task", () => {
  test("should add a new task", async () => {
    const task = {
      content: "New Task",
    };

    const create = jest.fn().mockResolvedValue(task);
    (taskService.create as jest.MockedFunction<typeof taskService.create>) =
      create;

    render(<App />);

    const input = screen.getByPlaceholderText("Add a new task...");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    await waitFor(() => expect(create).toHaveBeenCalledTimes(1));
    expect(input).toHaveValue("New Task");
  });
});
