import config from '../../config';
import axios from "axios";

export default class TodoService {

    constructor() {
        this.base = config.API_BASE;
        this.headers = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        this.data = new FormData();
    }

    getTasks() {
        return axios.get(this.base + '/?url=todo');
    }

    addTask(todo) {
        this.data.append('description', todo);
        return axios.post(this.base + '/?url=todo/add', this.data, this.headers);
    }

    updateTask(todo) {
        this.data.append('description', todo.description);
        this.data.append('status', todo.status);
        this.data.append('id', todo.id);
        return axios.post(this.base + '/?url=todo/edit', this.data, this.headers);
    }

    deleteTask(taskId) {
        return axios.delete(this.base + '/?url=todo/delete&id=' + taskId, this.headers);
    }

    deleteCompletedTask() {
        return axios.delete(this.base + '/?url=todo/deleteCompleted', this.headers);
    }

    filterTasks(status) {
        return axios.get(this.base + '/?url=todo/filter&status=' + status, this.headers);
    }
}