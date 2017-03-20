import {Injectable} from '@angular/core';
import {Http, Headers, URLSearchParams} from '@angular/http';

@Injectable()
export class HttpClient {

    constructor(private http: Http) {}

    createAuthorizationHeader(headers: Headers) {
        headers.append('Authorization', 'Bearer ' +
            JSON.parse(localStorage.getItem('tokenData')).access_token);
        console.log(JSON.parse(localStorage.getItem('tokenData')).access_token);
    }

    get(url, params ?: URLSearchParams) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
            headers: headers,
            search: params
        });
    }

    post(url, data) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(url, data, {
            headers: headers
        });
    }

    put(url, data) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.put(url, data, {
            headers: headers
        });
    }

    delete(url) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.delete(url,  {
            headers: headers
        });
    }
}