import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AlertComponent } from './_directives/index'
import { LoginComponent} from './login/index';
import { routing } from './app.routing';

import {RegisterComponent, InternalRegisterComponent} from "./register/index";
import {AlertService, UserService, AuthenticationService, BonusTypeService, BonusService} from "./services/index";
import {AuthGuard} from "./auth.guard";
import {NavigationComponent} from "./navigation/navigation.component";
import {BonusTypeList, BonusTypeUpdate, BonusTypeCreate, BonusTypeDropdown, //BonusType
  InternalUserList, //registration
  BonusCreate, BonusUpdate, BonusList // bonus
} from "./components/model/index";
import {HttpClient} from "./client/http.client";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    AlertComponent,
    NavigationComponent,
      /* Bonus Type */
    BonusTypeList,
    BonusTypeUpdate,
    BonusTypeCreate,
    BonusTypeDropdown,
    /* Bonus */
    BonusCreate,
    BonusUpdate,
    BonusList,
      /* Internal registration */
    InternalRegisterComponent,
    InternalUserList,
  ],
  providers: [
    AlertService,
    UserService,
    AuthenticationService,
    AuthGuard,
    HttpClient,
    BonusTypeService,
    BonusService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
}
