import { Routes } from '@angular/router';
import { ReservacionOperacionesComponent } from './reservacion/reservacionOperaciones.component';
import { EditReservacionComponent } from './reservacion/edit-reservacion/edit-reservacion.component';


export const OPERACIONES_ROUTES: Routes = [
  { path:'reservacion', component:ReservacionOperacionesComponent },
  { path: 'reservacion/edit/:id', component: EditReservacionComponent }

];
