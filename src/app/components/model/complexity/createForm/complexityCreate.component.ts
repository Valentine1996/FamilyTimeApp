import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AlertService} from "../../../../services/alert.service";
import {ComplexityService} from "../../../../services/complexityService";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ValidationService} from "../../../../services/validation.service";
import {LoaderService} from "../../../../services/spinner.service";

@Component({
    selector : 'complexity-create',
    templateUrl: 'complexityCreate.component.html',

})

export class ComplexityCreate implements OnInit{
    form: FormGroup;

    constructor(
        private router: Router,
        private complexityService: ComplexityService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private validationService : ValidationService,
        private loaderService : LoaderService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            type: ['', [<any>Validators.required, <any>Validators.maxLength(16)]],
            description: ['', [<any>Validators.required]]
        });

        this.form.valueChanges.subscribe(
            data => this.formErrors = this.validationService.onValueChanged(this.form, this.formErrors, this.validationMessages))
    }

    create(formGroup : FormGroup) {
        this.loaderService.displayLoader(true);

        //Data from form
        let model = formGroup.value;

        this.complexityService.create(model)
            .subscribe(
                data => {
                    this.alertService.success('Created successful', true);
                    this.router.navigate(['/complexity/list']);
                    this.loaderService.displayLoader(false);
                },
                error => {
                    this.alertService.error(error);
                    this.loaderService.displayLoader(false);
                });
    }

    // Validation
    formErrors = {
        'type' : [],
        'description' : []
    };

    validationMessages = {
        'type': {
            'required': 'Type is required.',
            'maxlength': "Type can't be more than 16 characters"
        },
        'description': {
            'required': 'Description is required.'
        }
    }
}
