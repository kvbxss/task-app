import React, { ChangeEvent, HTMLProps, FunctionComponent } from "react";
import styled from "styled-components";

interface TaskFormProps extends HTMLProps<HTMLDivElement> {
  newContent: string;
  handleContentChange: (event: ChangeEvent<HTMLInputElement>) => void;
  addTask: () => void;
}
const TaskForm: FunctionComponent<TaskFormProps> = ({
  newContent,
  handleContentChange,
  addTask,
}) => {
  return (
    <Form onSubmit={addTask}>
      <Title>Tasks Organizer</Title>
      <Text type="text" value={newContent} onChange={handleContentChange} />
      <div>
        <Add type="submit">Add</Add>
      </div>
    </Form>
  );
};

export default TaskForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Lucida Console", "Courier New", monospace;
`;

const Title = styled.h2`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Add = styled.button`
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

const Text = styled.input`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  font-family: "Lucida Console", "Courier New", monospace;
  border: 2px solid palevioletred;
  border-radius: 3px;
  width: 300px;
`;
