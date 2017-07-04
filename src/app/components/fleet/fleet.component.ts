import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FleetService } from '../../services/fleet.service';
import { UserInfoService } from '../../services/user-info.service';
import { ReservacionService, ConfigService } from '../../services/index';

declare var $:any;
@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html'
})
export class FleetComponent {

  city:string = "";
  fleet:any[];
  vehicles:any;
  citys:any;
  userLocalated:string ="";
  countrys:any[];
  reservacion:any;
  country:number;
  countryFleet:string;
  constructor( private activatedRoute:ActivatedRoute,
                private fleetService:FleetService,
                private _UserInfoService:UserInfoService,
                private _router:Router,
                private _reservacionService:ReservacionService,
                private _config:ConfigService) {
                  this._config.getCountry().subscribe(resp=>{
                    this.countrys = resp;
                      for (let country of this.countrys) {
                          if(country.name === this._UserInfoService.countryLocated)
                          {
                            this.country = country.id;
                            this.userLocalated = country.id;
                            this.onChange(this.userLocalated);
                          }
                      }
                  });
                }
    onChange(newValue) {
      this._reservacionService.reservacion.CountryId = newValue;
      this._config.getCity(newValue)
        .subscribe( data => {
          this.citys=data;
       });
    }
    onChangeCity(newValue) {
      this._reservacionService.reservacion.CityId = newValue;
      this._config.getTypeFleet(newValue)
        .subscribe( data => {
          this.fleet=data;
       });
    }
    onChangeFleet(newValue) {
      this._config.getVehicles(newValue)
        .subscribe( data => {
          if(data.length != undefined){
            this._reservacionService.reservacion.fleetId = newValue;
            this.vehicles=data;
          }

       });
    }
    verDetalle(idVehiculo:number){
      this._reservacionService.reservacion.idVehicle = idVehiculo;
      this._router.navigate(['reservacionEnd'])
    }
  }
