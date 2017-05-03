import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AlertService} from "../../../../services/alert.service";
import {ComplexityService} from "../../../../services/complexityService";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ValidationService} from "../../../../services/validation.service";
import {LoaderService} from "../../../../services/spinner.service";

@Component({
    templateUrl: 'complexityUpdate.component.html'
})

export class ComplexityUpdate implements OnInit {
    initComplexity: any;
    form: FormGroup;
    private sub :any;
    id: number;

    constructor(
        private router: Router,
        private complexityService: ComplexityService,
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

        this.complexityService.getById(this.id).subscribe(
            data => {
                //Set init data to form
                this.form.get("type").setValue(data.type);
                this.form.get("description").setValue(data.description);

                this.initComplexity = data;

                this.loaderService.displayLoader(false);
            },

            error => {
                this.alertService.error("Problem with loading the complexity");

                this.loaderService.displayLoader(false);
            }
        )
    }

    buildForm() {
        this.form = this.formBuilder.group({
            type: ['', [<any>Validators.required, <any>Validators.maxLength(16)]],
            description: ['', [<any>Validators.required]]
        });

        this.form.valueChanges.subscribe(
            data => this.formErrors = this.validationService.onValueChanged(this.form, this.formErrors, this.validationMessages))
    }

    update(formGroup : FormGroup) {
        this.loaderService.displayLoader(true);

        //Data from form
        let model = formGroup.value;

        // Add required fields
        model.id = this.initComplexity.id

        this.complexityService.update(model)
            .subscribe(
                data => {
                    this.alertService.success('Updated successful', true);
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
