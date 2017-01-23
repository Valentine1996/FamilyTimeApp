import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {User} from "../models/user";

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    create(user: User) {
        return this.http.post('/api/secvurity/signup', user).map((response: Response) => response.json());
    }

    // private helper methods
}