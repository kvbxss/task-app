import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import Task from "./components/Task";
import taskService from "./service/Api";
import styled from "styled-components";
import Register from "./components/RegisterForm";
import Login from "./components/LoginForm";
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

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

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Navigate replace to={"/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    )
  );

  return (
    <Wrapper>
      <Login />
      <Register />
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
  display: flex;
  flex-direction: column;
  font-family: "Lucida Console", "Courier New", monospace;
  margin: 0 auto;
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  list-style-type: none;
  padding: 0;
  align-items: center;
  justify-items: center;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
