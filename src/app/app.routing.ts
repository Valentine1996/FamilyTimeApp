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
  /* Bonus routing */
  { path: 'bonus/create', component: BonusCreate, canActivate: [AuthGuard] },
  { path: 'bonus/list', component: BonusList, canActivate: [AuthGuard]},
  { path: 'bonus/update/:id', component: BonusUpdate, canActivate: [AuthGuard]  },
  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(routes);
