import { Component } from '@angular/core';

import '../style/app.scss';
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public authService: AuthenticationService) {
    console.log(authService)
  }
}
