import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { IReservacion } from '../clases/reservacion.class';

@Injectable()
export class ReservacionService {

  urlBusqueda:string = "../assets/json/country.json"
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
  searchCountry(searchOptions:string){
    let opcionesCity:any[] = [];
    return this.http.get(this.urlBusqueda).map(resp=>{
      for (let country of resp.json().countrys) {
        for (let citys of country.country) {
            for (let city of citys.Citys) {
              if(city.toLowerCase().indexOf(searchOptions.toLowerCase()) >= 0 )
              {
                let opcion = {
                  country:citys.CountryName,
                  city:city
                };
                opcionesCity.push(opcion);
              }
            }
        }
      }
      return opcionesCity;
    });
  }
  searchCityForCountry(searchOptions:string,countrySearch:string){
    let opcionesCity:any[] = [];
    return this.http.get(this.urlBusqueda).map(resp=>{
      for (let country of resp.json().countrys) {
        for (let citys of country.country) {
          if(citys.CountryName == countrySearch){
            for (let city of citys.Citys) {
              if(city.toLowerCase().indexOf(searchOptions.toLowerCase()) >= 0 )
              {
                let opcion = {
                  country:citys.CountryName,
                  city:city
                };
                opcionesCity.push(opcion);
              }
            }
          }
        }
      }
      return opcionesCity;
    });
  }
  searchCityForCountryOnly(countrySearch:number){
    let opcionesCity:any[] = [];
    return this.http.get(this.urlBusqueda).map(resp=>{
      for (let country of resp.json().countrys) {
        for (let citys of country.country) {
          if(citys.CountryName == countrySearch){
            for (let city of citys.Citys) {
                let opcion = {
                  country:citys.CountryName,
                  city:city
                };
                opcionesCity.push(opcion);
            }
          }
        }
      }
      return opcionesCity;
    });
  }
  getCityForCountry(countrySearch:number){
    let opcionesCity:any[] = [];
    return this.http.get(this.urlBusqueda).map(resp=>{
      for (let country of resp.json().countrys) {
        for (let citys of country.country) {
          if(citys.CountryName == countrySearch)
          {

            for (let city of citys.Citys) {
                let opcion = {
                  country:citys.CountryName,
                  city:city
                }
                opcionesCity.push(opcion);
              }
            }
          }
        }
      return opcionesCity;
    });
  }
}
