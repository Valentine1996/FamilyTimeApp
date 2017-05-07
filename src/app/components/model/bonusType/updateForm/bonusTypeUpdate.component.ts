import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BonusTypeService} from "../../../../services/bonusTypeService";
import {AlertService} from "../../../../services/alert.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ValidationService} from "../../../../services/validation.service";
import {LoaderService} from "../../../../services/spinner.service";

@Component({
    templateUrl: 'bonusTypeUpdate.component.html'
})

export class BonusTypeUpdate implements OnInit {
    initBonusType : any;
    form: FormGroup;
    private sub :any;
    id: number;

    constructor(
        private router: Router,
        private bonusTypeService: BonusTypeService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private validationService : ValidationService,
        private loaderService : LoaderService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.loaderService.displayLoader(true);

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });

        this.buildForm();

        this.bonusTypeService.getById(this.id).subscribe(
            data => {
                //Set init data to form
                this.form.get("shortName").setValue(data.shortName);

                this.form.get("description").setValue(data.description);

                this.initBonusType = data;

                this.loaderService.displayLoader(false);
            },

            error => {
                this.alertService.error("Problem with loading the bonusType");
                this.loaderService.displayLoader(false);
            }
        )
    }

    buildForm() {
        this.form = this.formBuilder.group({
            shortName: ["", [<any>Validators.required, <any>Validators.maxLength(16)]],
            description: ["", [<any>Validators.required]]
        });

        this.form.valueChanges.subscribe(
            data => this.formErrors = this.validationService.onValueChanged(this.form, this.formErrors, this.validationMessages))
    }

    update(formGroup : FormGroup) {
        this.loaderService.displayLoader(true);

        //Data from form
        let model = formGroup.value;

        //Add required fields
        model.id = this.initBonusType.id;
        model.iconName = this.initBonusType.iconName;

        this.bonusTypeService.update(model)
            .subscribe(
                data => {
                    this.alertService.success('Updated successful', true);
                    this.router.navigate(['/bonusType/list']);
                    this.loaderService.displayLoader(false);
                },
                error => {
                    this.alertService.error(error);
                    this.loaderService.displayLoader(false);
                });
    }

    // Validation
    formErrors = {
        'shortName' : [],
        'description' : []
    };

    validationMessages = {
        'shortName': {
            'required': 'Short name is required.',
            'maxlength': 'Short name be more than 16 characters long.'
        },
        'description': {
            'required': 'Short name is required.'
        }
    }
}
