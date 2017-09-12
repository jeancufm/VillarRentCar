import { Routes } from '@angular/router';
import { PromotorComponent } from './promotor/promotor.component';
import { UserComponent } from './user/user.component';
import { FormPromotorComponent } from './promotor/form-promotor/form-promotor.component'
import { FormUserComponent } from './user/form-user/form-user.component';

export const CLUB_ROUTES: Routes = [
  { path: 'Promotores', component: PromotorComponent },
  { path: 'Promotores/promotorEdit/:id', component: FormPromotorComponent },
  { path: 'Promotores/new', component: FormPromotorComponent },
  { path: 'Referidos', component: UserComponent },
  { path: 'Referidos/referidorEdit/:id', component: FormUserComponent },
  { path: 'Referidos/new', component: FormUserComponent },

];
