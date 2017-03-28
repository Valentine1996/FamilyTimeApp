import { Component, OnInit } from '@angular/core';
import {Task} from "../../../../model/task";
import {TaskService} from "../../../../services/taskService";
import {TaskStatus} from "../../../../model/taskStatus";

@Component({
    selector: 'task-list',
    templateUrl: 'taskList.component.html',
    styleUrls: ['taskList.component.css']
})

export class TaskList implements OnInit {

    tasks: Task[] = [];

    constructor(private taskService: TaskService) {
    }

    ngOnInit() {
        this.loadAllTasksByStatus(TaskStatus.OPEN);
    }

    private loadAllTasksOnClick(status : any) {
        console.log("RadioValue " + status.target.value);

        if(status.target.value == "OPEN"){
            this.loadAllTasksByStatus(TaskStatus.OPEN);
        } else if (status.target.value == "SOLVED") {
            this.loadAllTasksByStatus(TaskStatus.SOLVED);
        }
    }

    private loadAllTasksByStatus(status: TaskStatus) {
        console.log("Load work")
        this.taskService.getAllTasksByStatus(status).subscribe(tasks => { this.tasks = tasks; });
    }

    onDelete(id : number) {
        this.taskService.delete(id).subscribe(() => { this.loadAllTasksByStatus(TaskStatus.OPEN); });
    }
}