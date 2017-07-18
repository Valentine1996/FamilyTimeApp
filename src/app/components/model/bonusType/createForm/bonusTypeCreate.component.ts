import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BonusTypeService} from "../../../../services/bonusTypeService";
import {AlertService} from "../../../../services/alert.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ValidationService} from "../../../../services/validation.service";
import {LoaderService} from "../../../../services/spinner.service";

@Component({
    selector : 'bonusType-create',
    templateUrl: 'bonusTypeCreate.component.html',

})

export class BonusTypeCreate implements OnInit{
    form: FormGroup;

    constructor(
        private router: Router,
        private bonusTypeService: BonusTypeService,
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
            shortName: ['', [<any>Validators.required, <any>Validators.maxLength(16)]],
            description: ['', [<any>Validators.required]]
        });

        this.form.valueChanges.subscribe(
            data => this.formErrors = this.validationService.onValueChanged(this.form, this.formErrors, this.validationMessages))
    }

    create(formGroup : FormGroup) {
        this.loaderService.displayLoader(true);

        //Data from form
        let model = formGroup.value;
        model.iconName = "Mock";

        this.bonusTypeService.create(model)
            .subscribe(
                data => {
                    this.alertService.success('Created successful', true);
                    this.router.navigate(['../list'], {relativeTo: this.route});
                },
                error => {
                    this.alertService.error(error);
                    this.loaderService.displayLoader(false);
                },
                () => {
                    this.loaderService.displayLoader(false);
                }
            );
    }

    // Validation
    formErrors = {
        'shortName' : [],
        'description' : []
    };
    validationMessages = {
        'shortName': {
            'required': 'Short name is required.',
            'maxlength': "Short name can't be more than 16 characters"
        },
        'description': {
            'required': 'Description is required.'
        }
    }
}
