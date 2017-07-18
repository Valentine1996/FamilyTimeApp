import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AlertService} from "../../../../services/alert.service";
import {BonusService} from "../../../../services/bonusService";
import {BonusType} from "../../../../model/bonusType";
import {Bonus} from "../../../../model/bonus";
import {BonusTypeService} from "../../../../services/bonusTypeService";
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import {ValidationService} from "../../../../services/validation.service";
import {LoaderService} from "../../../../services/spinner.service";

@Component({
    templateUrl: 'bonusCreate.component.html'
})

export class BonusCreate implements OnInit {
    form: FormGroup;

    bonusTypes: BonusType[] = [];

    constructor(
        private router: Router,
        private bonusService: BonusService,
        private bonusTypeService: BonusTypeService,
        private formBuilder: FormBuilder,
        private validationService : ValidationService,
        private loaderService : LoaderService,
        private alertService: AlertService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.loadAllBonusTypes();
        this.buildForm();
    }

    buildForm() {
        this.form = this.formBuilder.group({
            title: ['', [<any>Validators.required, <any>Validators.maxLength(16)]],
            description: ['', [<any>Validators.required]],
            bonusTypeId: ['', [<any>Validators.required]],
            price: ['', [<any>Validators.required]],

        });

        this.form.valueChanges.subscribe(
            data => this.formErrors = this.validationService.onValueChanged(this.form, this.formErrors, this.validationMessages))
    }

    create(formGroup : FormGroup) {
        this.loaderService.displayLoader(true);

        //Data from form
        let model = formGroup.value;

        this.bonusService.create(model)
            .subscribe(
                data => {
                    this.alertService.success('Created successful', true);
                    this.router.navigate(['../list'], {relativeTo: this.route});
                    this.loaderService.displayLoader(false);

                },
                error => {
                    this.alertService.error(error);
                    this.loaderService.displayLoader(false);
                });
    }

    private loadAllBonusTypes() {
        this.bonusTypeService.getAll().subscribe(bonusTypes => { this.bonusTypes = bonusTypes; });
    }

    formErrors = {
        'title' : [],
        'description' : [],
        'bonusTypeId' : [],
        'price' : []
    };
    validationMessages = {
        'title': {
            'required': 'Title is required.',
            'maxlength': "Title can't be more than 16 characters"
        },
        'description': {
            'required': 'Description is required.'
        },
        'bonusTypeId': {
            'required': 'Bonus type is required.'
        },
        'price': {
            'required': 'Price is required.'
        }
    }
}
