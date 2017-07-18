import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AlertService} from "../../../../services/alert.service";
import {Bonus} from "../../../../model/bonus";
import {BonusService} from "../../../../services/bonusService";
import {TaskType} from "../../../../model/taskType";
import {Complexity} from "../../../../model/complexity";
import {User} from "../../../../model/user";
import {TaskTypeService} from "../../../../services/taskTypeService";
import {ComplexityService} from "../../../../services/complexityService";
import {UserService} from "../../../../services/user.service";
import {TaskService} from "../../../../services/taskService";
import * as moment from "moment";

@Component({
    templateUrl: 'taskUpdate.component.html'
})

export class TaskUpdate implements OnInit {
    model: any = {};
    private sub :any;
    id: number;
    loading = false;

    // Data for bonus dropdown
    bonuses: Bonus[] = [];

    // Data for task type dropdown
    taskTypes: TaskType[] = [];

    // Data for complexity dropdown
    complexities: Complexity[] = [];

    // Data for task type dropdown
    performers: User[] = [];

    constructor(
        private router: Router,
        private taskService : TaskService,
        private bonusService: BonusService,
        private taskTypeService : TaskTypeService,
        private complexityService : ComplexityService,
        private userService : UserService,
        private alertService: AlertService,
        private route: ActivatedRoute) {}

    ngOnInit() {
        this.loadAllBonuses();
        this.loadAllTaskTypes();
        this.loadAllComplexities();
        this.loadAllPerformers();

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
        });

        this.taskService.getById(this.id).subscribe(
            data => {
                this.model.id = data.id;
                this.model.taskTypeId = data.taskType.id;
                this.model.complexityId = data.complexity.id;
                this.model.performerId = data.performer.id;
                this.model.bonusId = data.bonus.id;
                this.model.description = data.description;
                this.model.prize = data.prize;
                this.model.closeTo = data.closeTo;
                this.model.status = data.status;
            },

            error => {
                this.alertService.error("Problem with loading the task");
            }
        )
    }

    update() {
        this.loading = true;

        this.model.closeTo = moment(this.model.closeTo).format("YYYY-MM-DD[T]HH:mm");

        this.taskService.update(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Updated successful', true);
                    this.router.navigate(['../../list'], {relativeTo: this.route});
                },
                error => {
                    this.loading = false;
                    this.alertService.error(error);
                });
    }

    private loadAllBonuses() {
        this.bonusService.getAll().subscribe(bonuses => { this.bonuses = bonuses; });
    }

    private loadAllTaskTypes() {
        this.taskTypeService.getAll().subscribe(taskTypes => {
            this.taskTypes = taskTypes; });
    }

    private loadAllComplexities() {
        this.complexityService.getAll().subscribe(complexities => { this.complexities = complexities; });
    }

    private loadAllPerformers() {
        this.userService.getAll().subscribe(performers => { this.performers = performers; });
    }
}
