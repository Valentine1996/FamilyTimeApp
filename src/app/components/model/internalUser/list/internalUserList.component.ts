import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../../services/user.service";

@Component({
    selector: 'user-list',
    templateUrl: 'internalUserList.component.html',
    styleUrls: ['internalUserList.component.css']
})

export class InternalUserList implements OnInit {

    internalUserList: InternalUserList[] = [];

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(internalUserList => { this.internalUserList = internalUserList; });
    }
}