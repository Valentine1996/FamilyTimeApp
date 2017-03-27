import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import {User} from "../model/user";
import {HttpClient} from "../client/http.client";
import {InternalUser} from "../model/internalUser";

@Injectable()
export class UserService {

    constructor(private http: Http, private httpClient: HttpClient) {
    }

    //Method  for creating main user
    create(user: User) {
        return this.http.post('/api/security/signup', user).map((response: Response) => response.json());
    }

    //Method  for creating user internally in app
    createFromApp(user: InternalUser) {
        return this.httpClient.post('/api/security/internal/signup', user).map((response: Response) => response.json());
    }

    getAll(){
        return this.httpClient.get('/api/users').map((response: Response) => response.json());
    }
    // private helper methods

    //Get logged user
    getLoggedUser(){
        return this.httpClient.get('/api/security/loggedUser').map((response: Response) => response.json());
    }
}