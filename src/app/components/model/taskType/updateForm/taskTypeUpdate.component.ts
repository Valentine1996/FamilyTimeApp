import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AlertService} from "../../../../services/alert.service";
import {TaskTypeService} from "../../../../services/taskTypeService";

@Component({
    templateUrl: 'taskTypeUpdate.component.html'
})

export class TaskTypeUpdate implements OnInit {
    model: any = {};
    loading = false;
    private sub :any;
    id: number;

    constructor(
        private router: Router,
        private taskTypeService: TaskTypeService,
        private alertService: AlertService,
        private route: ActivatedRoute) {}

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });

        this.taskTypeService.getById(this.id).subscribe(
            data => {
                this.model = data;
            },

            error => {
                this.alertService.error("Problem with loading the taskType");
            }
        )
    }

    update() {
        this.loading = true;

        this.taskTypeService.update(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Updated successful', true);
                    this.router.navigate(['/taskType/list']);
                },
                error => {
                    this.loading = false;
                    this.alertService.error(error);
                });
    }
}
