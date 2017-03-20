import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Task} from "../../../model/task";
import {TaskService} from "../../../services/taskService";
import {AuthenticationService} from "../../../services/authentication.service";

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

    constructor(private taskService : TaskService,
                private authService : AuthenticationService) {
    }

    ngOnInit() {
    }

    deleteTask(id : number){
        // this.taskService.delete(id);
        this.onDeleted.emit(id)
    }
}