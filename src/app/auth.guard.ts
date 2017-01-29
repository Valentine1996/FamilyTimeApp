// logged-in.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import {AuthenticationService} from "./services/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authentificationService: AuthenticationService) {}

    canActivate() {
        return this.authentificationService.isLoggedIn();
    }
}