import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AlertService} from "../../../../services/alert.service";
import {TaskTypeService} from "../../../../services/taskTypeService";
import {ComplexityService} from "../../../../services/complexityService";

@Component({
    selector : 'complexity-create',
    templateUrl: 'complexityCreate.component.html',

})

export class ComplexityCreate implements OnInit{
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private complexityService: ComplexityService,
        private alertService: AlertService,
        private route: ActivatedRoute) {}

    ngOnInit() {

    }

    create() {
        this.loading = true;
        this.complexityService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Created successful', true);
                    this.router.navigate(['/complexity/list']);
                },
                error => {
                    this.loading=false;
                    this.alertService.error(error);
                });
    }
}
