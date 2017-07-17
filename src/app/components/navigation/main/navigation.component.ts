import {Component} from "@angular/core";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
    selector: 'navigation-main',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class NavigationMain {

    constructor(private authService : AuthenticationService) {
        // Do stuff
    }

}
