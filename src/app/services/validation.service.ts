import { Injectable } from '@angular/core';
import {NgForm, FormGroup} from "@angular/forms";

@Injectable()
export class ValidationService {
    onValueChanged  (formGroup : FormGroup, formErrors : any, validationMessages : any) {
        if (!formGroup ) { return; }
        const form = formGroup;

        for (const field in formErrors) {
            // clear previous error message (if any)
            formErrors[field] = [];
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = validationMessages[field];
                for (const key in control.errors) {
                    formErrors[field].push(messages[key]);
                }
            }
        }

        return formErrors;
    }

}