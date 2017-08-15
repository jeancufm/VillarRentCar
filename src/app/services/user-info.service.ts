import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class UserInfoService {
  urlUbicacion:string = "http://api.wipmania.com/jsonp?callback=JSONP_CALLBACK";
  countryLocated:string = "EE.UU";
  constructor(private http:Http,
              private _jsonp:Jsonp) {  }

  getUbicacion(){
    let url = this.urlUbicacion;
    return this._jsonp.get(url).map( datos=>{
      return datos.json().address.country;
    });
  }


}
