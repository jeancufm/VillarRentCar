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
export class FleetComponent implements OnDestroy{

  city:string = "";
  fleet:any[];
  vehicles:any;
  citys:any;
  userLocalated:string ="";
  countrys:any[];
  reservacion:any;
  country:number;
  countryFleet:string;
  typeFleet:number;
  path:string ="http://localhost/VillaCarApi/uploads";
  constructor( private activatedRoute:ActivatedRoute,
                private fleetService:FleetService,
                private _UserInfoService:UserInfoService,
                private _router:Router,
                private _reservacionService:ReservacionService,
                private _config:ConfigService) {
                  this._config.ruta = 'fleet';
                  this._config.getCountry().subscribe(resp=>{
                    this.countrys = resp;
                      for (let country of this.countrys) {
                          if(country.id === this._UserInfoService.countryLocated)
                          {
                            this.country = country.id;
                            this._reservacionService.reservacion.CountryId = country.id;
                            this._config.getCity(country.id)
                              .subscribe( data => {
                                this.citys=data;
                                this.city = data[0].id
                                this._reservacionService.reservacion.CityId = data[0].id;
                                this._config.getTypeFleet(data[0].id)
                                  .subscribe( data => {
                                    this.fleet=data;
                                    this.typeFleet = data[0].id;
                                    this._config.getVehicles(data[0].id)
                                      .subscribe( data => {
                                        if(data.length != undefined){
                                          this._reservacionService.reservacion.fleetId = data[0].id;
                                          this.vehicles=data;
                                        }

                                     });
                                 });
                             });
                          }
                      }
                  });
                }
    onChange(newValue) {
      this._reservacionService.reservacion.CountryId = newValue;
      this.country = newValue;
      this._config.getCity(newValue)
        .subscribe( data => {
          this.citys=data;
       });
    }
    onChangeCity(newValue) {
      this._reservacionService.reservacion.CityId = newValue;
      this.city = newValue;
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
    ngOnDestroy(){
      this._config.ruta = 'home';
    }
  }
