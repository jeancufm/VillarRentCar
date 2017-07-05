import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { IReservacion } from '../clases/reservacion.class';

@Injectable()
export class ReservacionService {

  urlBusqueda:string = "http://localhost:90/VillaCarApi/";
  reservacion:IReservacion = {
    CountryId:0,
    CityId:0,
    InitDate: new Date(),
    returnCityId:0,
    ReturnDate: new Date(),
    fleetId:0,
    age:"",
    returnDiferent:false,
    mail:"",
    codePromotion:"",
    idVehicle:0
  };
  opciones:any;
  opcionesReturn:any;
  opcionesFleet:any;
  constructor(private http:Http) { }
  SolicitudReservacion(reservacion:any){
    let query = "ReservacionRegisterUpdate.php";
    let url = this.urlBusqueda + query;
    return this.http.post(url,reservacion)
      .map( resp=>{
        if (resp.json().Fallo != undefined)
        {
          return null;
        }
        return resp.json();
      });
  }
}
