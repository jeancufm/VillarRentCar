import { Routes } from '@angular/router';
import { PromotorComponent } from './promotor/promotor.component';
import { UserComponent } from './user/user.component';


export const CLUB_ROUTES: Routes = [
  { path: 'Promotores', component: PromotorComponent },
  { path: 'Usuarios', component: UserComponent }

];
