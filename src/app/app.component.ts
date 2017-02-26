import { Component } from '@angular/core';

import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  constructor(public authService: AuthenticationService) {
    console.log(authService)
  }
}
