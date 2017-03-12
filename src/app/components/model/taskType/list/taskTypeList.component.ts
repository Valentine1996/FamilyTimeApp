import { Component, OnInit } from '@angular/core';
import {TaskType} from "../../../../model/taskType";
import {BonusTypeService} from "../../../../services/bonusTypeService";
import {TaskTypeService} from "../../../../services/taskTypeService";

@Component({
    selector: 'taskType-list',
    templateUrl: 'taskTypeList.component.html',
    styleUrls: ['/../../../../style/common/table/table.css']
})

export class TaskTypeList implements OnInit {

    taskTypes: TaskType[] = [];

    constructor(private taskTypeService: TaskTypeService) {

    }

    ngOnInit() {
        this.loadAllTaskTypes();
    }

    deleteTaskType(id: number) {
        this.taskTypeService.delete(id).subscribe(() => { this.loadAllTaskTypes() });
    }

    private loadAllTaskTypes() {
        this.taskTypeService.getAll().subscribe(taskTypes => { this.taskTypes = taskTypes; });
    }
}