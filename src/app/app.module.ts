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
import { FleetReservacionDetailsComponent } from './components/fleet-reservacion/fleet-reservacion-details/fleet-reservacion-details.component';
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
        FleetReservacionDetailsComponent,
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
        NgDropFileDirective
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
