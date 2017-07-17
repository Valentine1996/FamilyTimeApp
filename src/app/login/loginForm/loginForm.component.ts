import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {LoaderService} from "../../services/spinner.service";

@Component({
    templateUrl: 'loginForm.component.html',
    styleUrls: ['../../style/common/form/form.css']
})

export class LoginForm {
    model: any = {};
    loading = false;
    error : String;

    constructor(
        private authenticationService: AuthenticationService,
        private loaderService : LoaderService) {
    }

    login() {
        this.error = "";

        this.loaderService.displayLoader(true);
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                null,
                error => {
                    if(error.status === 400) {
                        this.error = "Incorrect username or password";
                    }

                    this.loaderService.displayLoader(false);
                },
                () => {
                    this.loaderService.displayLoader(false);
                }
            );
    }
}
