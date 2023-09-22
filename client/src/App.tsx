import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import Task from "./components/Task";
import taskService from "./service/Api";
import styled from "styled-components";

interface TaskObject {
  id: number;
  content: string;
  done: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TaskObject[]>([]);
  const [newContent, setNewContent] = useState<string>("");

  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewContent(event.target.value);
  };

  const addTask = () => {
    if (!newContent.trim()) {
      return;
    }

    const taskObject: TaskObject = {
      content: newContent,
      done: false,
      id: new Date().getTime(),
    };

    taskService.create(taskObject).then((returnedTask) => {
      setTasks([...tasks, returnedTask]);
      setNewContent("");
    });
  };

  const handleDelete = (id: number) => {
    taskService.remove(id).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  const handleUpdateDone = (id: number) => {
    const task = tasks.find((task) => task.id === id);
    if (!task) {
      return;
    }

    const updatedTask = {
      ...task,
      done: !task.done,
    };

    taskService.update(id, updatedTask).then((returnedTask) => {
      setTasks(tasks.map((task) => (task.id !== id ? task : returnedTask)));
    });
  };

  useEffect(() => {
    taskService.getAll().then((initialTasks) => {
      setTasks(initialTasks);
    });
  }, []);

  return (
    <Wrapper>
      <TaskForm
        newContent={newContent}
        handleContentChange={handleContentChange}
        addTask={addTask}
      />
      <List>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            handleDelete={handleDelete}
            handleUpdate={handleUpdateDone}
          />
        ))}
      </List>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  font-family: "Lucida Console", "Courier New", monospace;
  margin: 1em;
  padding: 0.25em 1em;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;
