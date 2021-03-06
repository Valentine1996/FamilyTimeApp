import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import {AlertService} from "./alert.service";
import {Router} from "@angular/router";
import {UserService} from "./user.service";
import {HttpClient} from "../client/http.client";
import {Observable} from "rxjs";

@Injectable()
export class AuthenticationService {

    private loggedIn = false;

    private readonly reserveTime = 5;

    constructor(private http: Http,
                private alertService : AlertService,
                private userService : UserService,
                private router: Router) {

        //Check user status in the storage if page refresh
        if(localStorage.getItem("IsLoggedIn") != null) {
            this.loggedIn = true;

            this.checkAccessTokenExpiration();
        }
    }

    login (username: string, password: string) : Observable<{}> {

        let result = new Observable(observer => {
            let headers = new Headers();
            headers.append('Authorization', 'Basic ZmFtaWx5VGltZTpjaHJvbWVyaXZlcg==');

            headers.append("Content-Type", "application/x-www-form-urlencoded")

            var body = "username=" + username + "&password=" + password +
                "&grant_type=password&client_id=familyTime&client_secret=chromeriver";

            this.http.post('/api/oauth/token', body, {headers: headers})
                .map((response: Response) => response.json())
                .subscribe(
                    data => {

                        // store user's token details in local storage to keep user logged in and to allow requests to server
                        localStorage.setItem('tokenData', JSON.stringify(data));

                        //Create date of token expiration
                        var expirationDate = new Date();

                        // console.log("Current date" + expirationDate);

                        //Subtract 5 seconds as reserve
                        expirationDate.setSeconds(expirationDate.getSeconds() + Number(data.expires_in) - this.reserveTime);

                        //Save expiration date to local storage
                        localStorage.setItem('expirationDate', expirationDate.getTime().toString())

                        // console.log("Current date + expiration" + expirationDate);
                        this.loggedIn = true;
                        //Save user's status to  local storage to                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           save it after refresh
                        localStorage.setItem('IsLoggedIn', 'true');
                        // set timeout to get valid access token
                        var expirationTime = data.expires_in;

                        setTimeout(this.getAccessTokenUsingRefreshOne.bind(this), (expirationTime - 5) * 1000);

                        //Set user role
                        this.userService.getLoggedUser().subscribe(
                            data => {
                                localStorage.setItem('parent', data.isParent);

                                observer.complete();

                                this.router.navigate(['/dashboard/main']);
                            },

                            error => { // No logged user
                                this.alertService.error(error);
                            }
                        );
                    },

                    error => {
                        observer.error(error)
                    });
        });

        return result;
    }

    getAccessTokenUsingRefreshOne() {
        let headers = new Headers();
        headers.append('Authorization', 'Basic ZmFtaWx5VGltZTpjaHJvbWVyaXZlcg==');

        headers.append("Content-Type", "application/x-www-form-urlencoded");

        let refreshToken = JSON.parse(localStorage.getItem('tokenData')).refresh_token;

        // console.log('refresh token' + JSON.parse(localStorage.getItem('tokenData')).refresh_token);

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

                    //Create date of token expiration
                    var expirationDate = new Date();

                    //Subtract 5 seconds as reserve

                    expirationDate.setSeconds(expirationDate.getSeconds() + Number(data.expires_in) - this.reserveTime)

                    //Save expiration date to local storage
                    localStorage.setItem('expirationDate', expirationDate.getTime().toString())

                    // set timeout to get valid access token
                    var timeLeft;

                    timeLeft =  Number(localStorage.getItem('expirationDate')) - new Date().getTime();

                    // console.log('ExpirationTime, time out' + timeLeft)

                    setTimeout(this.getAccessTokenUsingRefreshOne.bind(this), timeLeft)
                },

                error => { // refresh token expired
                    this.logout()
                });
    }

    checkAccessTokenExpiration() {
        if(localStorage.getItem("expirationDate") != null) {
            //Check expiration date
            var expirationDate = new Date(Number(localStorage.getItem('expirationDate')))
            var currentDate = new Date();

            if(currentDate >= expirationDate){ // token has expired
                this.logout()
            } else { // set timeout to restore access token
                var timeLeft = expirationDate.getTime() - currentDate.getTime();

                setTimeout(this.getAccessTokenUsingRefreshOne.bind(this), timeLeft)
            }
        } else { // if no expiration time - navigate to login page
            this.logout();
        }
    }

    logout() {
        // remove user's data from local storage to log out
        localStorage.removeItem('tokenData');
        localStorage.removeItem('IsLoggedIn');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('parent');
        this.loggedIn = false;
        this.router.navigate([{outlets: {primary: 'login', navigation: null}}])
    }


    isLoggedIn() : boolean {
        return this.loggedIn;
    }

    isParent() : boolean {

        if(localStorage.getItem("parent") != null) {

            let isParent : boolean = (localStorage.getItem("parent") === "true")

            return isParent;
        }
        return true;
    }
}