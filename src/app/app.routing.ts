import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
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

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'main', component: NavigationComponent, outlet:"navigation", canActivate: [AuthGuard]},
    /* registarion routing*/
  { path: 'login', component: LoginComponent},
  { path: 'internalUser/list', component: InternalUserList, canActivate: [AuthGuard]},
  { path: 'internalUser/create', component: InternalRegisterComponent, canActivate: [AuthGuard]},
    /* Bonus type routing */
  { path: 'bonusType/list', component: BonusTypeList, canActivate: [AuthGuard]},
  { path: 'bonusType/update/:id', component: BonusTypeUpdate, canActivate: [AuthGuard]  },
  { path: 'bonusType/create', component: BonusTypeCreate, canActivate: [AuthGuard] },

  /* Task type routing */
  { path: 'taskType/list', component: TaskTypeList, canActivate: [AuthGuard]},
  { path: 'taskType/update/:id', component: TaskTypeUpdate, canActivate: [AuthGuard]  },
  { path: 'taskType/create', component: TaskTypeCreate, canActivate: [AuthGuard] },

  /* Complexity routing */
  { path: 'complexity/list', component: ComplexityList, canActivate: [AuthGuard]},
  { path: 'complexity/update/:id', component: ComplexityUpdate, canActivate: [AuthGuard]  },
  { path: 'complexity/create', component: ComplexityCreate, canActivate: [AuthGuard] },

  /* Bonus routing */
  { path: 'bonus/create', component: BonusCreate, canActivate: [AuthGuard] },
  { path: 'bonus/list', component: BonusList, canActivate: [AuthGuard]},
  { path: 'bonus/update/:id', component: BonusUpdate, canActivate: [AuthGuard]  },

  /* Task routing */
  { path: 'task/list', component: TaskList, canActivate: [AuthGuard]},
  { path: 'task/update/:id', component: TaskUpdate, canActivate: [AuthGuard]  },
  { path: 'task/create', component: TaskCreate, canActivate: [AuthGuard] },

  /* Approval routing */
  { path: 'approval/list', component: ApprovalList, canActivate: [AuthGuard]},

  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(routes);
