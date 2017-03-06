import { Injectable } from '@angular/core';
import {Response} from '@angular/http';
import {HttpClient} from "../client/http.client";
import {Bonus} from "../model/bonus";

@Injectable()
export class BonusService{

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get('/api/bonus').map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/bonus/' + id).map((response: Response) => response.json());
    }

    create(bonus: Bonus) {
        return this.http.post('/api/bonus', bonus).map((response: Response) => response.json());
    }

    update(bonus: Bonus) {
        return this.http.put('/api/bonus/' + bonus.id, bonus).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/bonus/' + id).map((response: Response) => response);
    }
    // private helper methods
}