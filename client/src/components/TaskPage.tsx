import Task from "../components/Task";
import TaskForm from "../components/TaskForm";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import taskService from "../service/Api";

interface TaskObject {
  id: number;
  content: string;
  done: boolean;
}

const TaskPage = () => {
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
    <div>
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
    </div>
  );
};

export default TaskPage;

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
