import { Injectable } from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient} from "../client/http.client";
import {Complexity} from "../model/complexity";

@Injectable()
export class ComplexityService{

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get('/api/complexity').map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/complexity/' + id).map((response: Response) => response.json());
    }

    create(complexity: Complexity) {
        return this.http.post('/api/complexity', complexity).map((response: Response) => response.json());
    }

    update(complexity: Complexity) {
        return this.http.put('/api/complexity/' + complexity.id, complexity).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/complexity/' + id).map((response: Response) => response);
    }
    // private helper methods
}