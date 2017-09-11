import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, RequestOptions, JsonpModule} from '@angular/http';


// used to create fake backend
import { fakeBackendProvider } from './helpers/index';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './directives/index';
import { MomentModule } from 'angular2-moment';
import { AuthGuard } from './guards/index';
import { BanderaPipe } from './pipes/banderas.pipe';
import { AlertService, AuthenticationService, UserService, UserInfoService,FleetService,ReservacionService,ConfigService } from './services/index';
import { HomeComponent } from './components/home/index';
import { LoginComponent } from './components/login/index';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ReservacionComponent } from './components/shared/reservacion/reservacion.component';
import { RegisterComponent } from './components/register/index';
import { FleetComponent } from './components/fleet/fleet.component';
import { FleetReservacionComponent } from './components/fleet-reservacion/fleet-reservacion.component';
import { ReservacionEndComponent } from './components/reservacion-end/reservacion-end.component';
import { AdminFleetComponent } from './components/admin-fleet/admin-fleet.component';
import { TypeFleetComponent } from './components/admin-fleet/type-fleet/type-fleet.component';
import { VehiclesComponent } from './components/admin-fleet/vehicles/vehicles.component';
import { CountryComponent } from './components/admin-fleet/country/country.component';
import { CityComponent } from './components/admin-fleet/city/city.component';
import { FormCityComponent } from './components/admin-fleet/city/form-city/form-city.component';
import { FormCountryComponent } from './components/admin-fleet/country/form-country/form-country.component';
import { FormTypeFleetComponent } from './components/admin-fleet/type-fleet/form-type-fleet/form-type-fleet.component';
import { FormVehiclesComponent } from './components/admin-fleet/vehicles/form-vehicles/form-vehicles.component';
import { NgDropFileDirective } from './directives/ng-drop-file.directive';
import { OperacionesComponent } from './components/operaciones/operaciones.component';
import { EditReservacionComponent } from './components/operaciones/reservacion/edit-reservacion/edit-reservacion.component';
import { ReservacionOperacionesComponent } from './components/operaciones/reservacion/reservacionOperaciones.component';
import { AdminClubComponent } from './components/admin-club/admin-club.component';
import { PromotorComponent } from './components/admin-club/promotor/promotor.component';
import { UserComponent } from './components/admin-club/user/user.component';
import { FormPromotorComponent } from './components/admin-club/promotor/form-promotor/form-promotor.component';
import { WizardComponent } from './components/shared/wizard/wizard.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        JsonpModule,
        ReactiveFormsModule,
        MomentModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        NavbarComponent,
        BanderaPipe,
        FleetComponent,
        ReservacionComponent,
        FleetReservacionComponent,
        ReservacionEndComponent,
        AdminFleetComponent,
        TypeFleetComponent,
        VehiclesComponent,
        CountryComponent,
        CityComponent,
        FormCityComponent,
        FormCountryComponent,
        FormTypeFleetComponent,
        FormVehiclesComponent,
        NgDropFileDirective,
        OperacionesComponent,
        EditReservacionComponent,
        ReservacionOperacionesComponent,
        AdminClubComponent,
        PromotorComponent,
        UserComponent,
        FormPromotorComponent,
        WizardComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        UserInfoService,
        FleetService,
        ReservacionService,
        ConfigService,

        // providers used to create fake backend
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
