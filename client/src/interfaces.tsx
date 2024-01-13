import { ChangeEvent, HTMLProps } from "react";

export interface TaskProps {
  task: {
    id: number;
    content: string;
    done: boolean;
  };
  handleDelete: (id: number) => void;
  handleUpdate: (id: number, done: boolean) => void;
}

export interface TaskFormProps extends HTMLProps<HTMLDivElement> {
  newContent: string;
  handleContentChange: (event: ChangeEvent<HTMLInputElement>) => void;
  addTask: () => void;
}
