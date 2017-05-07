import { Component, OnInit } from '@angular/core';
import {Task} from "../../../../model/task";
import {TaskService} from "../../../../services/taskService";
import {TaskStatus} from "../../../../model/taskStatus";
import {LoaderService} from "../../../../services/spinner.service";

@Component({
    selector: 'task-list',
    templateUrl: 'taskList.component.html',
    styleUrls: ['taskList.component.css']
})

export class TaskList implements OnInit {

    tasks: Task[] = [];

    currentTaskStatus : TaskStatus;

    constructor(private taskService: TaskService,
                private loaderService : LoaderService) {
       this.currentTaskStatus = TaskStatus.OPEN;
    }

    ngOnInit() {
        this.loaderService.displayLoader(true);
        this.loadAllTasksByStatus(this.currentTaskStatus);
        this.loaderService.displayLoader(false);
    }

    private loadAllTasksOnClick(status : any) {
        if(status.target.value == "OPEN"){
            this.currentTaskStatus = TaskStatus.OPEN;

            this.loadAllTasksByStatus(this.currentTaskStatus);
        } else if (status.target.value == "PENDING") {
            this.currentTaskStatus = TaskStatus.PENDING;

            this.loadAllTasksByStatus(this.currentTaskStatus);
        } else if (status.target.value == "SOLVED") {
            this.currentTaskStatus = TaskStatus.SOLVED;

            this.loadAllTasksByStatus(this.currentTaskStatus);
        }
    }

    private loadAllTasksByStatus(status: TaskStatus) {
        this.taskService.getAllPerformerTasksByStatus(status).subscribe(tasks => { this.tasks = tasks; });
    }

    delete(id : number) {
        this.taskService.delete(id).subscribe(() => { this.loadAllTasksByStatus(this.currentTaskStatus); });
    }

    requestForApproval(id : number) {

        this.taskService.changeStatus(id, TaskStatus[TaskStatus.PENDING]).subscribe(() => {this.loadAllTasksByStatus(this.currentTaskStatus);});
    }
}