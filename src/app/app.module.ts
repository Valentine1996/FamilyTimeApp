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
import { DateTimePickerModule } from 'ng2-date-time-picker';


import {RegisterComponent, InternalRegisterComponent} from "./register/index";
import {AlertService, UserService, AuthenticationService, BonusTypeService, BonusService, TaskService} from "./services/index";
import {AuthGuard} from "./auth.guard";
import {NavigationComponent} from "./navigation/navigation.component";
import {BonusTypeList, BonusTypeUpdate, BonusTypeCreate, BonusTypeDropdown, //BonusType
  TaskTypeList, TaskTypeCreate, TaskTypeUpdate, TaskTypeDropdown, //TaskType
  ComplexityList, ComplexityCreate, ComplexityUpdate, ComplexityDropdown,
  InternalUserList, //registration
  BonusCreate, BonusUpdate, BonusList, BonusDropdown, // bonus
  TaskList, SingleTask, TaskCreate, TaskUpdate,
  PerformerDropdown, // Performer
  ApprovalList, SingleApproval //Approvals
} from "./components/model/index";
import {HttpClient} from "./client/http.client";
import {TaskTypeService} from "./services/taskTypeService";
import {ComplexityService} from "./services/complexityService";
import moment = require("moment");

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    routing,
    DateTimePickerModule
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

    /* Task Type */
    TaskTypeList,
    TaskTypeUpdate,
    TaskTypeCreate,
    TaskTypeDropdown,

    /* Task */
    TaskList,
    SingleTask,
    TaskCreate,
    TaskUpdate,

    /* Approval */
    ApprovalList,
    SingleApproval,

    /* Complexity */
    ComplexityList,
    ComplexityUpdate,
    ComplexityCreate,
    ComplexityDropdown,

    /* Bonus */
    BonusCreate,
    BonusUpdate,
    BonusList,
    BonusDropdown,

    /* Performer dropdown*/
    PerformerDropdown,

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
    TaskTypeService,
    BonusService,
    ComplexityService,
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
}
