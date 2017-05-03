import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../services/user.service";
import {AlertService} from "../services/alert.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ValidationService} from "../services/validation.service";
import {CustomValidators} from 'ng2-validation';
import {LoaderService} from "../services/spinner.service";

@Component({
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css', "../style/common/form/form.css"]
})

export class RegisterComponent {
    registrationForm: FormGroup;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private validationService : ValidationService,
        private loaderService : LoaderService) {
    }

    ngOnInit(){
        this.buildForm();
    }

    buildForm() {
        this.registrationForm = this.formBuilder.group({
            firstName: ['', [<any>Validators.required, <any>Validators.minLength(2),<any>Validators.maxLength(32)]],
            lastName: ['', [<any>Validators.required, <any>Validators.minLength(2), <any>Validators.maxLength(32)]],
            middleName: ['', [<any>Validators.required, <any>Validators.minLength(2), <any>Validators.maxLength(32)]],
            username: ['', [<any>Validators.required, <any>Validators.minLength(8), <any>Validators.maxLength(32), CustomValidators.email]],
            password: ['', [<any>Validators.required, <any>Validators.minLength(8), <any>Validators.maxLength(32)]],
            birthday: ['', [<any>Validators.required]],
            gender: [false],
            familyName: ['', [<any>Validators.required, <any>Validators.maxLength(32)]]
        });

        this.registrationForm.valueChanges.subscribe(
            data => this.formErrors = this.validationService.onValueChanged(this.registrationForm, this.formErrors, this.validationMessages))
    }

    register(formGroup : FormGroup) {
        this.loaderService.displayLoader(true);

        let model = formGroup.value;
        let locale = require('browser-locale');

        //get user's locale
        model.locale = locale();

        this.userService.create(model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    // this.loaderService.displayLoader(false);
                });
    }

    // Validation
    formErrors = {
        'firstName' : [],
        'lastName' : [],
        'middleName' : [],
        'username' : [],
        'password' : [],
        'birthday' : [],
        'familyName' : []

    };
    validationMessages = {
        'firstName': {
            'required':      'First name is required.',
            'minlength':     'First name be at least 2 characters long.',
            'maxlength':     'First name be more than 32 characters long.'
        },
        'lastName': {
            'required':      'Last name is required.',
            'minlength':     'Last name be at least 2 characters long.',
            'maxlength':     'Last name be more than 32 characters long.'
        },
        'middleName': {
            'required':      'Middle name is required.',
            'minlength':     'Middle name must be at least 2 characters long.',
            'maxlength':     'Middle name cannot be more than 32 characters long.'
        },
        'username': {
            'required':      'Username is required.',
            'minlength':     'Username must be at least 8 characters long.',
            'maxlength':     'Username cannot be more than 32 characters long.',
            'email':         'Incorrect email.'
        },
        'password': {
            'required':      'Password is required.',
            'minlength':     'Password must be at least 8 characters long.',
            'maxlength':     'Password cannot be more than 32 characters long.'
        },
        'birthday': {
            'required':      'Birthday is required.'
        },
        'familyName': {
            'required':      'Family name is required.',
            'maxlength':     'Family name be more than 32 characters long.'
        },
    };
}
