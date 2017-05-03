import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AlertService} from "../../../../services/alert.service";
import {TaskTypeService} from "../../../../services/taskTypeService";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ValidationService} from "../../../../services/validation.service";
import {LoaderService} from "../../../../services/spinner.service";

@Component({
    templateUrl: 'taskTypeUpdate.component.html'
})

export class TaskTypeUpdate implements OnInit {
    initTaskType : any;
    form: FormGroup;
    private sub :any;
    id: number;

    constructor(
        private router: Router,
        private taskTypeService: TaskTypeService,
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

        this.taskTypeService.getById(this.id).subscribe(
            data => {
                //Set init dayta to form
                this.form.get("shortName").setValue(data.shortName);
                this.form.get("description").setValue(data.description);

                this.initTaskType = data;

                this.loaderService.displayLoader(false);
            },

            error => {
                this.alertService.error("Problem with loading the taskType");
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
        model.id = this.initTaskType.id;

        this.taskTypeService.update(model)
            .subscribe(
                data => {
                    this.alertService.success('Updated successful', true);
                    this.router.navigate(['/taskType/list']);
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
