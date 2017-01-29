import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {User} from "../models/user";

@Injectable()
export class UserService {

    constructor(private http: Http) {
    }

    create(user: User) {
        return this.http.post('/api/security/signup', user).map((response: Response) => response.json());
    }
    // private helper methods
}