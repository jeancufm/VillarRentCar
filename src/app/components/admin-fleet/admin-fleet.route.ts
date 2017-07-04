import { Routes } from '@angular/router';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { TypeFleetComponent } from './type-fleet/type-fleet.component';
import { CountryComponent } from './country/country.component';
import { FormCountryComponent } from './country/form-country/form-country.component';
import { CityComponent } from './city/city.component';
import { FormCityComponent } from './city/form-city/form-city.component';
import { FormTypeFleetComponent } from './type-fleet/form-type-fleet/form-type-fleet.component';
import { FormVehiclesComponent } from './vehicles/form-vehicles/form-vehicles.component';

export const FLEETS_ROUTES: Routes = [
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'vehicles/vehiclesEdit/:id', component: FormVehiclesComponent },
  { path: 'vehicles/new', component: FormVehiclesComponent },
  { path: 'typeFleet', component: TypeFleetComponent },
  { path: 'typeFleet/typeFleetEdit/:id', component: FormTypeFleetComponent },
  { path: 'typeFleet/new', component: FormTypeFleetComponent },
  { path: 'country', component: CountryComponent },
  { path: 'country/countryEdit/:id', component: FormCountryComponent },
  { path: 'country/new', component: FormCountryComponent },
  { path: 'city', component: CityComponent },
  { path: 'city/new', component: FormCityComponent },
  { path: 'city/cityEdit/:id', component: FormCityComponent }

];
