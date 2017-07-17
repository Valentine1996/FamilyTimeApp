// logged-in.guard.ts
import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRoute, Route} from '@angular/router';

import {AuthenticationService} from "./services/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authentificationService: AuthenticationService,
                private router: Router) {}

    canActivate() {

         if(this.authentificationService.isLoggedIn()){
             return true;
         } else {
             this.router.navigate(["/login/signin"]);
             return false;
         }
    }
}