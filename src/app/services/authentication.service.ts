import { Injectable } from '@angular/core';
import {Http, Headers, URLSearchParams, Response} from '@angular/http';

import {AlertService} from "./alert.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService {
    private loggedIn = false;

    constructor(private http: Http,
                private alertService : AlertService,
                private router: Router) {}

    login(username: string, password: string) {

        let headers = new Headers();
        headers.append('Authorization', 'Basic ZmFtaWx5VGltZTpjaHJvbWVyaXZlcg==');

        headers.append("Content-Type", "application/x-www-form-urlencoded")

        var body = "username=" + username + "&password=" + password +
            "&grant_type=password&client_id=familyTime&client_secret=chromeriver";

        this.http.post('/api/oauth/token', body, {headers : headers})
            .map((response: Response) => response.json())
            .subscribe(
                data => {

                // store user's token details in local storage to keep user logged in and to allow requests to server
                localStorage.setItem('tokenData', JSON.stringify(data));

                this.loggedIn = true;

                // set timeout to get valid access token
                var expirationTime = data.expires_in;

                setTimeout(this.getAccessTokenUsingRefreshOne.bind(this), (expirationTime - 5) * 1000);

                this.router.navigate([{outlets: {primary: 'home', navigation: 'main'}}])

                },

                error => {
                    this.alertService.error(error);
                });
    }

    getAccessTokenUsingRefreshOne() {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ZmFtaWx5VGltZTpjaHJvbWVyaXZlcg==');

        headers.append("Content-Type", "application/x-www-form-urlencoded");

        let refreshToken = JSON.parse(localStorage.getItem('tokenData')).refresh_token;

        console.log('refresh token' + JSON.parse(localStorage.getItem('tokenData')).refresh_token);

        var body = "grant_type=refresh_token&refresh_token=" + refreshToken +
            "&client_id=familyTime&client_secret=chromeriver";

        this.http.post('/api/oauth/token', body, {headers : headers})
            .map((response: Response) => response.json())
            .subscribe(
                data => {

                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    let oldAccessData = JSON.parse(localStorage.getItem('tokenData'));

                    //set new access token
                    oldAccessData.access_token = data.access_token;

                    //save updated access token
                    localStorage.setItem('tokenData', JSON.stringify(oldAccessData));

                    // set timeout to get valid access token
                    var expirationTime = oldAccessData.expires_in;

                    setTimeout(this.getAccessTokenUsingRefreshOne.bind(this), (expirationTime - 5) * 1000)
                },

                error => {
                    this.alertService.error(error);
                    this.router.navigate([{outlets: {primary: 'login', navigation: null}}])
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