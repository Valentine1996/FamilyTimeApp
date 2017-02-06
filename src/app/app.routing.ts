import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth.guard";
import {NavigationComponent} from "./navigation/navigation.component";
import {BonusTypeList} from "./components/model/bonusType/bonusTypeList/bonusTypeList.component";
import {BonusTypeUpdate} from "./components/model/bonusType/updateForm/bonusTypeUpdate.component";
import {BonusTypeCreate} from "./components/model/bonusType/createForm/bonusTypeCreate.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'bonusType/list', component: BonusTypeList, canActivate: [AuthGuard]},
  { path: 'main', component: NavigationComponent, outlet:"navigation", canActivate: [AuthGuard]},
  { path: 'bonusType/update/:id', component: BonusTypeUpdate, canActivate: [AuthGuard]  },
  { path: 'bonusType/create', component: BonusTypeCreate, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(routes);
