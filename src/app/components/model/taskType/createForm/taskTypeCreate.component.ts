import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AlertService} from "../../../../services/alert.service";
import {TaskTypeService} from "../../../../services/taskTypeService";

@Component({
    selector : 'taskType-create',
    templateUrl: 'taskTypeCreate.component.html',

})

export class TaskTypeCreate implements OnInit{
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private taskTypeService: TaskTypeService,
        private alertService: AlertService,
        private route: ActivatedRoute) {}

    ngOnInit() {

    }

    create() {
        this.loading = true;
        this.taskTypeService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Created successful', true);
                    this.router.navigate(['/taskType/list']);
                },
                error => {
                    this.loading=false;
                    this.alertService.error(error);
                });
    }
}
