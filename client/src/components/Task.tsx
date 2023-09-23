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
  handleUpdate: (id: number, done: boolean) => void;
}

const Task: FunctionComponent<TaskProps> = ({
  task,
  handleDelete,
  handleUpdate,
}) => {
  const [done, setDone] = useState<boolean>(task.done);

  const handleCheckboxChange = () => {
    if (window.confirm(`Set task ${task.content} as done?`)) {
      const updatedTask = {
        ...task,
        done: !done,
      };
      taskService
        .update(task.id, updatedTask)
        .then((returnedTask) => {
          setDone(returnedTask.done);
          handleUpdate(returnedTask.id, returnedTask.done);
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
      <br />
      Task: {task.content}
      <br />
      <CheckWrapper>
        <Label>
          <Checkbox
            type="checkbox"
            role="checkbox"
            name="checkbox"
            checked={done}
            onChange={handleCheckboxChange}
          />
          <Slider></Slider>
          <Toggle>Done</Toggle>
        </Label>
      </CheckWrapper>
      <br />
      <Button onClick={handleDeleteClick}>Delete</Button>
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

const Checkbox = styled.input`
  width: 30px;
  height: 30px;
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;

  &:checked {
    background-color: hsl(130deg, 100%, 30%);
  }

  &::after {
    transform: translateX(var(--slide-distance));
    transition: transform var(--transition-duration);
  }

  &:focus-visible {
    outline-offset: 2px;
    outline: 2px solid hsl(210deg, 100%, 40%);
  }
`;

const CheckWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1em;
  padding: 0.25em 1em;
  font-family: "Lucida Console", "Courier New", monospace;
`;

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;

  --slide-distance: 1.2rem;
  --slider-size: 1.25rem;
  --slider-padding: 0.2rem;
  --transition-duration: 200ms;
`;

const Slider = styled.div`
  flex-shrink: 0;
  width: calc(
    var(--slider-size) + var(--slide-distance) + var(--slider-padding) * 2
  );
  padding: var(--slider-padding);
  border-radius: 9999px;
  background-color: #d1d5db;
  transition: background-color var(--transition-duration);

  &::after {
    content: "";
    display: block;
    width: var(--slider-size);
    height: var(--slider-size);
    border-radius: 9999px;
    background-color: white;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
    transition: transform var(--transition-duration);
  }

  ${Checkbox}:checked + & {
    background-color: palevioletred;
  }

  ${Checkbox}:checked + &::after {
    transform: translateX(calc(var(--slide-distance) + var(--slider-padding)));
  }

  ${Checkbox}:focus-visible + & {
    box-shadow: 0 0 0 2px hsl(210deg, 100%, 40%);
  }
`;

const Toggle = styled.span`
  line-height: 1.5;
  font-family: "Lucida Console", "Courier New", monospace;
`;
