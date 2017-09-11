import { Routes } from '@angular/router';
import { PromotorComponent } from './promotor/promotor.component';
import { UserComponent } from './user/user.component';
import { FormPromotorComponent } from './promotor/form-promotor/form-promotor.component'


export const CLUB_ROUTES: Routes = [
  { path: 'Promotores', component: PromotorComponent },
  { path: 'Promotores/promotorEdit/:id', component: FormPromotorComponent },
  { path: 'Promotores/new', component: FormPromotorComponent },
  { path: 'Referidos', component: UserComponent }

];
