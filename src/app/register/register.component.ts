import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../services/user.service";
import {AlertService} from "../services/alert.service";

@Component({
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.model.isActive = true;
        this.model.isParent = true;
        console.log(this.model.firstName)
        console.log(this.model.isActive)
        console.log(this.model.birthday)
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                },
                error => {
                    this.alertService.error(error);
                    console.log(error)
                });
    }
}
