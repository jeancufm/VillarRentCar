import { Injectable } from '@angular/core';
import { Http,Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ConfigService {

  constructor(private http:Http) { }
  urlBusqueda:string = "http://localhost:90/VillaCarApi/"
  city:any;
  typeFleet:any;
  reservation:any;
  getCountry(){
    let query = "country.php";
    let url = this.urlBusqueda + query;
    return this.http.get(url)
    .map( resp=>{
      return resp.json();
    });
  }
  getCountryById(id:number){
    let query = "country.php?id="+id;
    let url = this.urlBusqueda + query;
    return this.http.get(url)
    .map( resp=>{
      return resp.json()[0];
    });
  }
  getCity(id:number){
    let query = "city.php";
    let url = this.urlBusqueda + query+"?id="+id;
    return this.http.get(url)
      .map( resp=>{
        if (resp.json().Fallo != undefined)
        {
          this.city = null;
          return this.city;
        }
        this.city = resp.json();
        return resp.json();
      });
  }
  getAllCity(){
    let query = "city.php";
    let url = this.urlBusqueda + query;
    return this.http.get(url)
      .map( resp=>{
        if (resp.json().Fallo != undefined)
        {
          this.city = null;
          return this.city;
        }
        this.city = resp.json();
        return resp.json();
      });
  }
  getCityById(id:number){
    let query = "cityById.php";
    let url = this.urlBusqueda + query+"?id="+id;
    return this.http.get(url)
      .map( resp=>{
        if (resp.json().Fallo != undefined)
        {
          this.city = null;
          return this.city;
        }
        this.city = resp.json()[0];
        return resp.json()[0];
      });
  }
  getTypeFleetsById(id:number){
    let query = "typeFleetById.php";
    let url = this.urlBusqueda + query+"?id="+id;
    return this.http.get(url)
      .map( resp=>{
        if (resp.json().Fallo != undefined)
        {
          this.typeFleet = null;
          return this.typeFleet;
        }
        this.typeFleet = resp.json()[0];
        return resp.json()[0];
      });
  }
  getTypeFleet(id:number){
    let query = "typeFleet.php";
    let url = this.urlBusqueda + query+"?id="+id;
    return this.http.get(url)
      .map( resp=>{
        if (resp.json().Fallo != undefined)
        {
          this.typeFleet = null;
          return this.typeFleet;
        }
        this.typeFleet = resp.json();
        return resp.json();
      });
  }
  getAllTypeFleet(){
    let query = "typeFleet.php";
    let url = this.urlBusqueda + query;
    return this.http.get(url)
      .map( resp=>{
        if (resp.json().Fallo != undefined)
        {
          this.typeFleet = null;
          return this.typeFleet;
        }
        this.typeFleet = resp.json();
        return resp.json();
      });
  }
  getVehicles(idFleet:number){
    let query = "vehicle.php";
    let url = this.urlBusqueda + query+"?id="+idFleet;
    return this.http.get(url)
      .map( resp=>{
        if (resp.json().Fallo != undefined)
        {
          this.typeFleet = null;
          return this.typeFleet;
        }
        this.typeFleet = resp.json();
        return resp.json();
      });
  }
  getVehicleById(id:number){
    let query = "vehicleById.php";
    let url = this.urlBusqueda + query+"?id="+id;
    return this.http.get(url)
      .map( resp=>{
        if (resp.json().Fallo != undefined)
        {
          return null;
        }
        return resp.json()[0];
      });
  }
  getAllVehicles(){
    let query = "vehicle.php";
    let url = this.urlBusqueda + query;
    return this.http.get(url)
      .map( resp=>{
        if (resp.json().Fallo != undefined)
        {
          this.typeFleet = null;
          return this.typeFleet;
        }
        this.typeFleet = resp.json();
        return resp.json();
      });
  }
  getReservation(id:number = 0){
    let query = "reservation.php";
    let url = this.urlBusqueda +(id==0?query:query+"?id="+id);
    return this.http.get(url)
      .map( resp=>{
        if (resp.json().Fallo != undefined)
        {
          this.reservation = null;
          return this.reservation;
        }
        this.reservation = resp.json();
        return resp.json();
      });
  }
  setCountry(country:any){
    let query = "countryRegisterUpdate.php";
    let url = this.urlBusqueda + query;
    return this.http.post(url,country)
      .map( resp=>{
        if (resp.json().Fallo != undefined)
        {
          return null;
        }
        return resp.json();
      });
  }
  setCity(city:any){
    let query = "cityRegisterUpdate.php";
    let url = this.urlBusqueda + query;
    return this.http.post(url,city)
      .map( resp=>{
        if (resp.json().Fallo != undefined)
        {
          return null;
        }
        return resp.json();
      });
  }
  setTypeFleet(typeFleet:any){
    let query = "typeFleetRegisterUpdate.php";
    let url = this.urlBusqueda + query;
    return this.http.post(url,typeFleet)
      .map( resp=>{
        if (resp.json().Fallo != undefined)
        {
          return null;
        }
        return resp.json();
      });
  }
  setVehicles(vehicles:any, archivos:File[]){
    let query = "vehicleRegisterUpdate.php";
    let formData = new FormData();
    if (archivos.length > 0) {
           for (let i = 0; i < archivos.length; i++) {
               formData.append('file[]', archivos[i]);
           }
    }
    formData.append('tags', JSON.stringify(vehicles));
    let url = this.urlBusqueda + query;
    return this.http.post(url,formData)
      .map( resp=>{
        if (resp.json().Fallo != undefined)
        {
          return null;
        }
        return resp.json();
      });
  }
  getStatus(id:number = 0){
    let query = "status.php";
    let url = this.urlBusqueda +(id==0?query:query+"?id="+id);
    return this.http.get(url)
      .map( resp=>{
        if (resp.json().Fallo != undefined)
        {
          return null;
        }
        return resp.json();
      });
  }
}
