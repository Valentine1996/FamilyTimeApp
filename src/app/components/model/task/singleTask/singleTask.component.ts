import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TaskService} from "../../../../services/taskService";
import {AuthenticationService} from "../../../../services/authentication.service";
import {Task} from "../../../../model/task";
import {TaskStatus} from "../../../../model/taskStatus";

@Component({
    selector: 'task',
    templateUrl: 'singleTask.component.html',
    styleUrls: ['singleTask.component.css']
})

export class SingleTask implements OnInit {

    @Input("task")
    task: Task;

    @Output("onDeleteTask")
    onDeleted = new EventEmitter<number>();

    @Output("onRequestForApproval")
    onRequestForApproval = new EventEmitter<number>();

    constructor(private taskService : TaskService,
                private authService : AuthenticationService) {
    }

    ngOnInit() {
    }

    deleteTask(id : number){
        this.onDeleted.emit(id)
    }

    requestForApproval(id : number){
        this.onRequestForApproval.emit(id);
    }

    isOpen(status : String) : boolean {
        return TaskStatus[TaskStatus.OPEN] == status;
    }

    isPending(status : String) : boolean {
        return TaskStatus[TaskStatus.PENDING] == status;
    }

    isSolved(status : String) : boolean {
        return TaskStatus[TaskStatus.SOLVED] == status;
    }
}