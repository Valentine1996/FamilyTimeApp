import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import {NgForm} from "@angular/forms";

@Injectable()
export class ValidationService {
    onValueChanged(componentForm : NgForm, formErrors : any, validationMessages : any, data?: any) {
        if (!componentForm ) { return; }
        const form = componentForm.form;

        for (const field in formErrors) {
            // clear previous error message (if any)
            formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = validationMessages[field];
                for (const key in control.errors) {
                    formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }
}