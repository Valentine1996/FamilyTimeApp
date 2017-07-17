import { Component } from '@angular/core';

import {AuthenticationService} from "./services/authentication.service";
import {LoaderService} from "./services/spinner.service";

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html'
})
export class AppComponent {

  loading = false;

  constructor( protected loaderService : LoaderService) {
        loaderService.loaderStatus.subscribe((val : boolean) => {
        this.loading = val;
    });
  }
}
