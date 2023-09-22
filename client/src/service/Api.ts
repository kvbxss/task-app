import axios from 'axios';

const baseUrl = 'http://localhost:4200/tasks';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
    };

interface Task {
    id: number;
    content: string;
    done: boolean;
}

const create = async (newTask: Task): Promise<Task> => {
    const response = await axios.post(baseUrl, newTask);
    return response.data;
};

const remove = async (id: number): Promise<Task> => {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
}

const update = async (id: number, newTask: Task): Promise<Task> => {
    const response = await axios.put(`${baseUrl}/${id}`, newTask);
    return response.data;
}

const taskService = { getAll, create, remove, update };

export default taskService;
