import { Routes } from '@angular/router';
import { FleetReservacionDetailsComponent } from './fleet-reservacion-details/fleet-reservacion-details.component';

export const RESERVACION_ROUTES: Routes = [
  { path: 'detail/:id', component: FleetReservacionDetailsComponent }
];
