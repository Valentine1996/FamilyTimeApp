import { Injectable } from '@angular/core';
import {Http, Headers, URLSearchParams, Response} from '@angular/http';

import {AlertService} from "./alert.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService {
    private loggedIn = false;

    constructor(private http: Http,
                private alertService : AlertService,
                private router: Router,) { }

    login(username: string, password: string) {

        let headers = new Headers();
        headers.append('Authorization', 'Basic ZmFtaWx5VGltZTpjaHJvbWVyaXZlcg==');

        let params: URLSearchParams = new URLSearchParams();

        params.set('username', username);
        params.set('password', password);
        params.set('grant_type', "password");
        params.set('client_id', "familyTime");
        params.set('client_secret', "chromeriver");

        this.http.post('/api/oauth/token', {body : null}, {headers : headers, search : params})
            .map((response: Response) => response.json())
            .subscribe(
                data => {

                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('tokenData', JSON.stringify(data));

                this.loggedIn = true;

                this.router.navigate([{outlets: {primary: 'home', navigation: 'main'}}])

                },

                error => {
                    this.alertService.error(error);
                });

    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('tokenData');
        this.loggedIn = false;
        this.router.navigate([{outlets: {primary: 'login', navigation: null}}])
    }

    isLoggedIn() : boolean {
        return this.loggedIn;
    }
}