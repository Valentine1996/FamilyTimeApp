import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../../services/user.service";
import {AlertService} from "../../services/alert.service";

@Component({
    templateUrl: 'internalRegister.component.html'
})

export class InternalRegisterComponent {
    model: any = {};

    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;

        let locale = require('browser-locale');

        //get user's locale
        this.model.locale = locale()

        this.userService.createFromApp(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Added successful', true);
                    this.router.navigate(['/internalUser/list']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
