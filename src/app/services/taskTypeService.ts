import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {HttpClient} from "../client/http.client";
import { TaskType } from "../model/taskType";

@Injectable()
export class TaskTypeService{

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get('/api/taskType').map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/taskType/' + id).map((response: Response) => response.json());
    }

    create(taskType: TaskType) {
        return this.http.post('/api/taskType', taskType).map((response: Response) => response.json());
    }

    update(taskType: TaskType) {
        return this.http.put('/api/taskType/' + taskType.id, taskType).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/taskType/' + id).map((response: Response) => response);
    }
    // private helper methods
}