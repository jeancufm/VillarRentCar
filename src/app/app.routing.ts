import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/index';
import { LoginComponent } from './components/login/index';
import { RegisterComponent } from './components/register/index';
import { AuthGuard } from './guards/index';
import { FleetComponent } from './components/fleet/fleet.component';
import { ReservacionEndComponent } from './components/reservacion-end/reservacion-end.component';
import { AdminFleetComponent } from './components/admin-fleet/admin-fleet.component';
import { FleetReservacionComponent } from './components/fleet-reservacion/fleet-reservacion.component';
import { RESERVACION_ROUTES } from './components/fleet-reservacion/fleet-reservacion.route';
import { FLEETS_ROUTES } from './components/admin-fleet/admin-fleet.route';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'fleet', component: FleetComponent  },
    {
      path: 'reservacionIni',
      component: FleetReservacionComponent,
      children: RESERVACION_ROUTES
    },
    {
      path: 'adminFleet',
      component: AdminFleetComponent,
      children: FLEETS_ROUTES,
      canActivate: [AuthGuard]
    },
    {
      path: 'adminClub',
      component: AdminFleetComponent,
      children: FLEETS_ROUTES,
      canActivate: [AuthGuard]
    },
    { path:'reservacionEnd', component: ReservacionEndComponent /*, canActivate: [AuthGuard]  */},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
