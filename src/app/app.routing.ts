import { RouterModule, Routes } from '@angular/router';

import {Details} from './home/details.component';
import { AboutComponent } from './about/about.component';
import {RegisterComponent} from "./register/register.component";
import {AuthGuard} from "./auth.guard";
import {NavigationComponent} from "./navigation/navigation.component";
import {BonusTypeList} from "./components/model/bonusType/list/bonusTypeList.component";
import {BonusTypeUpdate} from "./components/model/bonusType/updateForm/bonusTypeUpdate.component";
import {BonusTypeCreate} from "./components/model/bonusType/createForm/bonusTypeCreate.component";
import {InternalUserList} from "./components/model/internalUser/list/internalUserList.component";
import {InternalRegisterComponent} from "./register/internal/internalRegister.component";
import {BonusCreate} from "./components/model/bonus/createForm/bonusCreate.component";
import {BonusList} from "./components/model/bonus/list/bonusList.component";
import {BonusUpdate} from "./components/model/bonus/updateForm/bonusUpdate.component";
import {TaskTypeList} from "./components/model/taskType/list/taskTypeList.component";
import {TaskTypeUpdate} from "./components/model/taskType/updateForm/taskTypeUpdate.component";
import {TaskTypeCreate} from "./components/model/taskType/createForm/taskTypeCreate.component";
import {ComplexityList} from "./components/model/complexity/list/complexityList.component";
import {ComplexityUpdate} from "./components/model/complexity/updateForm/complexityUpdate.component";
import {ComplexityCreate} from "./components/model/complexity/createForm/complexityCreate.component";
import {TaskList} from "./components/model/task/list/taskList.component";
import {TaskCreate} from "./components/model/task/createForm/taskCreate.component";
import {TaskUpdate} from "./components/model/task/updateForm/taskUpdate.component";
import {ApprovalList} from "./components/model/task/approval/list/approvalList.component";
import {LoginForm} from "./login/loginForm/loginForm.component";
import {Login} from "./login/login.component";
import {Dashboard} from "./components/dashboard/dashboard.component";
import {Main} from "./components/dashboard/main/main.component";

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'about', component: AboutComponent},

    /* Login section */
  { path: 'login', component: Login, children: [

    {path: '', redirectTo: 'signin', pathMatch: 'full'},
    {path: 'signin', component: LoginForm},
    {path: 'details', component: Details },
    {path: 'register', component: RegisterComponent }

    ]
  },

  { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'main', pathMatch: 'full' },
      {path: 'details', component: Details },
      {path: 'main', component: Main, children: [
          {path: '', redirectTo: 'task/list', pathMatch: 'full'},
          {path: 'internalUser/list', component: InternalUserList},
          {path: 'internalUser/register', component: InternalRegisterComponent},
          /* Bonus type routing */
          {path: 'bonusType/list', component: BonusTypeList},
          {path: 'bonusType/update/:id', component: BonusTypeUpdate},
          {path: 'bonusType/create', component: BonusTypeCreate},

          /* Task type routing */
          {path: 'taskType/list', component: TaskTypeList},
          {path: 'taskType/update/:id', component: TaskTypeUpdate},
          {path: 'taskType/create', component: TaskTypeCreate},

          /* Complexity routing */
          {path: 'complexity/list', component: ComplexityList},
          {path: 'complexity/update/:id', component: ComplexityUpdate},
          {path: 'complexity/create', component: ComplexityCreate},

          /* Bonus routing */
          {path: 'bonus/create', component: BonusCreate},
          {path: 'bonus/list', component: BonusList},
          {path: 'bonus/update/:id', component: BonusUpdate},

          /* Task routing */
          {path: 'task/list', component: TaskList},
          {path: 'task/update/:id', component: TaskUpdate},
          {path: 'task/create', component: TaskCreate},

          /* Approval routing */
          {path: 'approval/list', component: ApprovalList}
        ]
      },
    ]
  },
  // otherwise redirect to login
  { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(routes);
