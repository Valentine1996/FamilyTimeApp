import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { DateTimePickerModule } from 'ng2-date-time-picker';
import { CustomFormsModule } from 'ng2-validation'
import * as spinner from 'ng2-spin-kit/app/spinners'

import {RegisterComponent, InternalRegisterComponent} from "./components/registration/index";
import {AlertService, UserService, AuthenticationService,
  BonusTypeService, BonusService, TaskService, TaskTypeService, ComplexityService, ValidationService,
  LoaderService} from "./services/index";
import {AuthGuard} from "./auth.guard";
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
import {Details} from "./components/details/details.component";
import {Login} from "./components/login/login.component";
import {LoginForm} from "./components/login/loginForm/loginForm.component";
import {Dashboard} from "./components/dashboard/dashboard.component";
import {Main} from "./components/dashboard/main/main.component";
import {AlertComponent} from "./components/alert/alert.component";
import {NavigationMain} from "./components/navigation/main/navigation.component";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    DateTimePickerModule,
    CustomFormsModule
  ],
  declarations: [
    AppComponent,
    Details,
    RegisterComponent,
    Login,
    LoginForm,
    AlertComponent,
    NavigationMain,
    Dashboard,
    Main,

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

      /* Spinner */
    spinner.CircleComponent
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
    TaskService,
    ValidationService,
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
}
