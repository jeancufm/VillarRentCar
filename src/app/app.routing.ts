import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/index';
import { LoginComponent } from './components/login/index';
import { RegisterComponent } from './components/register/index';
import { AuthGuard } from './guards/index';
import { FleetComponent } from './components/fleet/fleet.component';
import { ReservacionEndComponent } from './components/reservacion-end/reservacion-end.component';
import { AdminFleetComponent } from './components/admin-fleet/admin-fleet.component';
import { AdminClubComponent } from './components/admin-club/admin-club.component';
import { OperacionesComponent } from './components/operaciones/operaciones.component';
import { FleetReservacionComponent } from './components/fleet-reservacion/fleet-reservacion.component';
import { FLEETS_ROUTES } from './components/admin-fleet/admin-fleet.route';
import { OPERACIONES_ROUTES } from './components/operaciones/operaciones.route';
import { CLUB_ROUTES } from './components/admin-club/admin-club.route';

const appRoutes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'fleet', component: FleetComponent  },
    {
      path: 'reservacionIni',
      component: FleetReservacionComponent
    },
    {
      path: 'adminFleet',
      component: AdminFleetComponent,
      children: FLEETS_ROUTES,
      canActivate: [AuthGuard]
    },
    {
      path: 'adminClub',
      component: AdminClubComponent,
      children: CLUB_ROUTES,
      canActivate: [AuthGuard]
    },
    {
      path:'operaciones',
      component: OperacionesComponent ,
      children:OPERACIONES_ROUTES,
      canActivate: [AuthGuard]
    },
    { path:'reservacionEnd', component: ReservacionEndComponent /*, canActivate: [AuthGuard]  */},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
