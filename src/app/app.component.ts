import { Component } from '@angular/core';

import {AuthenticationService} from "./services/authentication.service";
import {LoaderService} from "./services/spinner.service";

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  loading = false;

  constructor(public authService: AuthenticationService,
              private loaderService : LoaderService) {
        this.loaderService.loaderStatus.subscribe((val : boolean) => {
        this.loading = val;
    });
  }
}
