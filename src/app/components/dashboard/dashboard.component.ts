import {AfterViewInit, Component, OnInit} from "@angular/core";
import {AuthenticationService} from "../../services/authentication.service";
import {LoaderService} from "../../services/spinner.service";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";

@Component({
    selector: 'dashboard', // <my-app></my-app>
    templateUrl: 'dashboard.component.html'
})
export class Dashboard extends AppComponent {

    constructor(private router: Router,
                private authService: AuthenticationService,
                protected loaderService : LoaderService) {
        super(loaderService);
    }

}