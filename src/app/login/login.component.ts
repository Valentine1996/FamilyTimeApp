import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {AlertService} from "../services/alert.service";

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['../style/common/form/form.css']
})

export class LoginComponent {
    model: any = {};
    loading = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) {
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password);

        // if(localStorage.getItem('access_token') == null){
        //     this.loading = false;
        // }
        this.loading = false;
    }
}
