import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AlertService} from "../../../../services/alert.service";
import {BonusService} from "../../../../services/bonusService";
import {Bonus} from "../../../../model/bonus";
import {TaskType} from "../../../../model/taskType";
import {TaskService} from "../../../../services/taskService";
import {TaskTypeService} from "../../../../services/taskTypeService";
import {User} from "../../../../model/user";
import {Complexity} from "../../../../model/complexity";
import {ComplexityService} from "../../../../services/complexityService";
import {UserService} from "../../../../services/user.service";
import moment = require("moment");

@Component({
    templateUrl: 'taskCreate.component.html'
})

export class TaskCreate implements OnInit {
    model: any = {};
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
        private alertService: AlertService) {}

    ngOnInit() {
        this.loadAllBonuses();
        this.loadAllTaskTypes();
        this.loadAllComplexities();
        this.loadAllPerformers();
    }

    create() {
        this.loading = true;

        var day = moment(this.model.closeTo).format("YYYY-MM-DD[T]HH:mm");

        this.model.closeTo = day;

        this.taskService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Created successful', true);
                    this.router.navigate(['/task/list']);
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
            console.log("In method: task types " + taskTypes);
            this.taskTypes = taskTypes; });
    }

    private loadAllComplexities() {
        this.complexityService.getAll().subscribe(complexities => { this.complexities = complexities; });
    }

    private loadAllPerformers() {
        this.userService.getAll().subscribe(performers => { this.performers = performers; });
    }
}
