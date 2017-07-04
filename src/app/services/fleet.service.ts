import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserInfoService } from './user-info.service';

@Injectable()
export class FleetService {

  fleet:any[];
  fleets:any[];
  nameFleets:any[] = [];
  userLocalated:string = "";
  fleetsCountry:any[] = [];
  VehiclesInfo:any;

  urlBusqueda:string = "../assets/json/fleet.json"
  UrlApi:string = "http://localhost:90/VillaCarApi/"
  constructor(private http:Http) {}
  getFleet(id:number = 1, country:number){
    return this.http.get(this.urlBusqueda)
      .map( resp=>{
        let fleets =resp.json().fleets;
        for (let fleet of fleets) {
            if(fleet.FleetCountry == country){
              this.fleets = fleet.fleet;
              for (let fleetType of fleet.fleet) {
                  if(fleetType.IdTipoVehiculo == id)
                  {
                    this.fleet = fleetType;
                    return this.fleet;
                  }
                }
            }
        }
      });
  }
  getNameFleets(){
    this.nameFleets = [];
            for (let fleet of this.fleets) {
            let objeto:Object = {
              name: fleet.TipoVehiculo,
              id: fleet.IdTipoVehiculo
            }
            this.nameFleets.push(objeto);
        }
        return this.nameFleets;
    }
  getCountryFleets(){
    this.fleetsCountry = [];
    return this.http.get(this.urlBusqueda)
      .map( resp=>{
          let fleets = resp.json().fleets;
          for (let FleetCountry of fleets) {
                this.fleetsCountry.push(FleetCountry.FleetCountry);

          }
          return this.fleetsCountry;
      });
  }
  getNameFleetsForCountry(countryName:string){
    let nameFleets:any[] = [];
    return this.http.get(this.urlBusqueda)
      .map( resp=>{
        let fleets =resp.json().fleets;
        for (let fleet of fleets) {
            if(fleet.FleetCountry.toLowerCase() == countryName.toLowerCase()){
              for (let fleetNames of fleet.fleet) {
                let fleetNamesVar = {
                  TipoVehiculo: fleetNames.TipoVehiculo,
                  IdTipoVehiculo : fleetNames.IdTipoVehiculo
                }
                nameFleets.push(fleetNamesVar);
              }
            }
          }
          return nameFleets;
        });
  }
  getVehicleInfo(idVehicle:number){
    let url = this.UrlApi + "vehicleById.php?id="+idVehicle
    return this.http.get(url)
    .map(
      resp=>{
        let datos =resp.json();
          console.log(datos);
          return datos;
        });
  }
  getFleetInfo(idTipoVehiculo:number, country:number){
    return this.http.get(this.urlBusqueda)
    .map(
      resp=>{
        let datos =resp.json().fleets;
        for (let fleet of datos) {
          if(fleet.FleetCountry == country){
              for (let fleet1 of fleet.fleet) {
                  if(fleet1.IdTipoVehiculo == idTipoVehiculo)
                  {
                          fleet1.vehicles = [];
                          return fleet1;
                    }
                  }
            }
        }
        });
  }
}
