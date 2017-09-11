import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FleetService } from '../../services/fleet.service';
import { UserInfoService, ReservacionService, ConfigService } from '../../services/index';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet-reservacion.component.html'
})
export class FleetReservacionComponent implements OnInit,OnDestroy {

  fleet:any[];
  vehicles:any;
  userLocalated:number;
  country:any[];
  reservacion:any;
  countryFleet:string;
  constructor( private activatedRoute:ActivatedRoute,
                private fleetService:FleetService,
                private _UserInfoService:UserInfoService,
                private _router:Router,
                private _ReservacionService:ReservacionService,
                private _ConfigService:ConfigService) {
                  this._ConfigService.ruta = 'fleet';
                }
    ngOnInit() {
      if(this._ReservacionService.reservacion.CountryId === 0){
        this._router.navigate(['home']);
      }
      this._ConfigService.getCountryById(this._ReservacionService.reservacion.CountryId).subscribe( data =>{
        this.country = data;
      });
      this._ConfigService.getTypeFleet(this._ReservacionService.reservacion.CityId).subscribe(data =>{
        this.fleet = data;
        this._ReservacionService.reservacion.fleetId =data[0].id;;
        this._ConfigService.getVehicles(data[0].id).subscribe(data =>{
          this.vehicles = data;
        })
      });

    }
    OnDestroy() {
      this._ReservacionService.reservacion = null;
    }
    SelectFleet(idx:number){
      this._ReservacionService.reservacion.fleetId = idx;
      this.fleetService.getFleet(idx,this._ReservacionService.reservacion.CountryId)
        .subscribe( data => {
          this.fleet=data;
        });
    }
    seleccionar(id,Modelo,Marca){
      this._ReservacionService.reservacion.idVehicle = id;
      this._router.navigate(['/reservacionEnd']);

    }
    onChange(newValue) {
        this.userLocalated = newValue;
        this.fleetService.getFleet(1,this.userLocalated)
         .subscribe( data => {
           this.fleet=data;
         });
      }
      ngOnDestroy(){
        this._ConfigService.ruta = 'home';
      }
  }
