import { Component, OnInit } from '@angular/core';
import {TaskType} from "../../../../model/taskType";
import {BonusTypeService} from "../../../../services/bonusTypeService";
import {TaskTypeService} from "../../../../services/taskTypeService";
import {LoaderService} from "../../../../services/spinner.service";

@Component({
    selector: 'taskType-list',
    templateUrl: 'taskTypeList.component.html',
    styleUrls: ['/../../../../style/common/table/table.css']
})

export class TaskTypeList implements OnInit {

    taskTypes: TaskType[] = [];

    constructor(private taskTypeService: TaskTypeService,
                private loaderService : LoaderService) {

    }

    ngOnInit() {
        this.loaderService.displayLoader(true);
        this.loadAllTaskTypes();
        this.loaderService.displayLoader(false);
    }

    deleteTaskType(id: number) {
        this.taskTypeService.delete(id).subscribe(() => { this.loadAllTaskTypes() });
    }

    private loadAllTaskTypes() {
        this.taskTypeService.getAll().subscribe(taskTypes => { this.taskTypes = taskTypes; });
    }
}