import {Component} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";

@Component({
    selector: 'navigation',
    templateUrl: 'navigation.component.html',
    styleUrls: ['navigation.component.css']
})
export class NavigationComponent {

    constructor(private authService : AuthenticationService) {
        // Do stuff
    }

}
