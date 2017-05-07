import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {AlertService} from "../services/alert.service";
import {LoaderService} from "../services/spinner.service";

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['../style/common/form/form.css']
})

export class LoginComponent {
    model: any = {};
    loading = false;
    errorMessage : String;

    constructor(
        private authenticationService: AuthenticationService,
        private loaderService : LoaderService) {
    }

    login() {
        this.errorMessage = "";

        this.loaderService.displayLoader(true);
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                null,
                error => {
                    if(error.status === 400) {
                        this.errorMessage = "Incorrect username or password";
                    }

                    this.loaderService.displayLoader(false);
                },
                () => {
                    this.loaderService.displayLoader(false);
                }
            );
    }
}
