import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Task} from "../../../../../model/task";
import {TaskStatus} from "../../../../../model/taskStatus";
import {TaskService} from "../../../../../services/taskService";
import {AuthenticationService} from "../../../../../services/authentication.service";

@Component({
    selector: 'approval',
    templateUrl: 'singleApproval.component.html',
    styleUrls: ['singleApproval.component.css']
})

export class SingleApproval implements OnInit {

    @Input("task")
    task: Task;

    @Output("onApprove")
    onApprove = new EventEmitter<number>();

    @Output("onReject")
    onReject = new EventEmitter<number>();

    constructor(private taskService : TaskService,
                private authService : AuthenticationService) {
    }

    ngOnInit() {
    }

    approve(id : number){
        this.onApprove.emit(id);
    }

    reject(id : number){
        this.onReject.emit(id);
    }
}