import { Injectable } from '@angular/core';
import {Response, URLSearchParams} from '@angular/http';
import {HttpClient} from "../client/http.client";
import { Task } from "../model/task";
import {TaskStatus} from "../model/taskStatus";

@Injectable()
export class TaskService{

    constructor(private http: HttpClient) {
    }

    getAllPerformerTasksByStatus(status : TaskStatus) {
        let params: URLSearchParams = new URLSearchParams();

        params.set('status', TaskStatus[status]);

        return this.http.get('/api/task/headPerformerTasks', params).map((response: Response) => response.json());
    }

    getAllCreatorTasksByStatus(status : TaskStatus) {
        let params: URLSearchParams = new URLSearchParams();

        params.set('status', TaskStatus[status]);

        return this.http.get('/api/task/headCreatorTasks', params).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/task/' + id).map((response: Response) => response.json());
    }

    getSubtasksByParentId(id: number) {
        return this.http.get('/api/task/subtasks/' + id).map((response: Response) => response.json());
    }

    create(task: Task) {
        return this.http.post('/api/task', task).map((response: Response) => response.json());
    }

    update(task: Task) {
        return this.http.put('/api/task/' + task.id, task).map((response: Response) => response.json());
    }

    changeStatus(taskId : number, taskStatus : String) {
        return this.http.patch('/api/task/' + taskId, taskStatus).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/task/' + id).map((response: Response) => response);
    }
    // private helper methods
}