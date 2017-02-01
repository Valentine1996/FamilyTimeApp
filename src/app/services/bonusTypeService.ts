import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {HttpClient} from "../client/http.client";
import {BonusType} from "../model/bonusType";

@Injectable()
export class BonusTypeService{

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get('/api/bonusType').map((response: Response) => response.json());
    }

    getById(id: number) {
        return this.http.get('/api/bonusType/' + id).map((response: Response) => response.json());
    }

    create(bonusType: BonusType) {
        return this.http.post('/api/bonusType', bonusType).map((response: Response) => response.json());
    }

    update(bonusType: BonusType) {
        return this.http.put('/api/bonusType' + bonusType.id, bonusType).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('/api/bonusType/' + id).map((response: Response) => response);
    }
    // private helper methods
}