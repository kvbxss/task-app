import React, { FunctionComponent, useState } from "react";
import taskService from "../service/Api";
import styled from "styled-components";

interface TaskProps {
  task: {
    id: number;
    content: string;
    done: boolean;
  };
  handleDelete: (id: number) => void;
  handleUpdate: (id: number) => void;
}

const Task: FunctionComponent<TaskProps> = ({
  task,
  handleDelete,
  handleUpdate,
}) => {
  const [done, setDone] = useState<boolean>(task.done);

  const handleUpdateDone = () => {
    if (window.confirm(`Set task ${task.content} as done?`)) {
      const updatedTask = {
        ...task,
        done: !done,
      };
      taskService
        .update(task.id, updatedTask)
        .then((returnedTask) => {
          handleUpdate(returnedTask.id);
          setDone(returnedTask.done);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Delete ${task.content}?`)) {
      taskService
        .remove(task.id)
        .then(() => {
          handleDelete(task.id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Element>
      ID: {task.id}
      <br />
      Task: {task.content}
      <br />
      Status: {task.done ? "✅" : ""}
      <br />
      <Button onClick={handleDeleteClick}>Delete</Button>
      <Button onClick={handleUpdateDone}>Done</Button>
    </Element>
  );
};

export default Task;

const Element = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  decoration: none;
  font-size: 1em;
  margin: 2em;
  padding: 3em;
  font-family: "Lucida Console", "Courier New", monospace;
  border: 2px solid palevioletred;
  border-radius: 3px;
  width: 300px;
  height: fit-content;
`;

const Button = styled.button`
  background: palevioletred;
  color: white;
  font-size: 1em;
  margin: 1em;
  font-family: "Lucida Console", "Courier New", monospace;
  padding: 0.25em 1em;
  border-radius: 4px;
  width: 100px;

  &:hover {
    background: white;
    color: palevioletred;
    border: 2px solid palevioletred;
    transition: 0.5s all ease-in-out;
  }
`;
