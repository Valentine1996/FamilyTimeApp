import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {BonusTypeService} from "../../../../services/bonusTypeService";
import {AlertService} from "../../../../services/alert.service";
import {BonusService} from "../../../../services/bonusService";
import {BonusType} from "../../../../model/bonusType";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ValidationService} from "../../../../services/validation.service";
import {LoaderService} from "../../../../services/spinner.service";

@Component({
    templateUrl: 'bonusUpdate.component.html'
})

export class BonusUpdate implements OnInit {
    initBonus : any;
    form: FormGroup;
    private sub :any;
    id: number;

    bonusTypes: BonusType[] = [];

    constructor(
        private router: Router,
        private bonusService: BonusService,
        private bonusTypeService: BonusTypeService,
        private alertService: AlertService,
        private formBuilder: FormBuilder,
        private validationService : ValidationService,
        private loaderService : LoaderService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.loaderService.displayLoader(true);

        this.loadAllBonusTypes();

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });

        this.buildForm();

        this.bonusService.getById(this.id).subscribe(
            data => {
                //Set init data to form
                this.form.get("title").setValue(data.title);
                this.form.get("description").setValue(data.description);
                this.form.get("bonusTypeId").setValue(data.bonusType.id);
                this.form.get("price").setValue(data.price);

                this.initBonus = data;

                this.loaderService.displayLoader(false);
            },

            error => {
                this.alertService.error("Problem with loading the bonus");
                this.loaderService.displayLoader(false);
            }
        )
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

    update(formGroup : FormGroup) {
        this.loaderService.displayLoader(true);

        //Data from form
        let model = formGroup.value;

        //Add required fields
        model.id = this.initBonus.id;

        this.bonusService.update(model)
            .subscribe(
                data => {
                    this.alertService.success('Updated successful', true);
                    this.router.navigate(['../../list'], {relativeTo: this.route});
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

    // Validation
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
