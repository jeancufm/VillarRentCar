import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservacionService } from '../../../services/reservacion.service';
import { FleetService } from '../../../services/fleet.service';
import { AuthenticationService,ConfigService, UserInfoService } from '../../../services/index';
import { IReservacion } from '../../../clases/reservacion.class';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.component.html',
  styles:[`
    background-color:"white";
    font-size:15px;
    .ng-invalid.ng-touched:not(form){
       border:1px solid red;
     }
    `]
})
export class ReservacionComponent implements OnInit {
  formulario:FormGroup;
  today = new Date();
  country:any;
  citys:any;
  constructor( private router:Router,
               private _reservacionService:ReservacionService,
               private _fleetService:FleetService,
               private auth:AuthenticationService,
               private  _config:ConfigService,
               private userInfo:UserInfoService) {
                 this.formulario = new FormGroup({
                  'InitDate':new FormControl('',[Validators.required]),
                  'returnCityId':new FormControl(''),
                  'ReturnDate':new FormControl('',Validators.required),
                  'countryId':new FormControl('',Validators.required),
                  'codePromotion':new FormControl(''),
                  'cityId':new FormControl(''),
                  'returnDiferent': new FormControl(true)
                 });
                 this._reservacionService.opciones = [];
                 this._reservacionService.opcionesReturn = [];
                 this._reservacionService.reservacion.CityId = 0;
                 if(this.auth.authenticated())
                 {
                   let datos = this.auth.getProfile();
                   this._reservacionService.reservacion.mail = datos.email;

                 }
                 this.formulario.controls['returnDiferent'].setValidators([
                   this.validReturnLocation.bind(this.formulario)
                 ]);
                 this.formulario.controls['cityId'].valueChanges.subscribe(data=>{
                    this.formulario.controls['returnDiferent'].updateValueAndValidity();
                  })
               }
  ngOnInit(){
      this._config.getCountry().subscribe(data => {
        this.country = data;
      });
  }
  validReturnLocation( control:FormControl ): { [s:string]:boolean }{
      let formulario:any = this;
      if(!control.value)
      {
        if(formulario.controls['returnCityId'].value.length > 0)
        {
          return {
            returnLocationValid:true
          }
        }

      }
        return null;
  }
  reservacionSearch(){
    this._reservacionService.reservacion.CountryId = this.formulario.controls['countryId'].value;
    this._reservacionService.reservacion.CityId = this.formulario.controls['cityId'].value;
    this._reservacionService.reservacion.InitDate = this.formulario.controls['InitDate'].value;
    this._reservacionService.reservacion.returnCityId = this.formulario.controls['returnCityId'].value;
    this._reservacionService.reservacion.ReturnDate = this.formulario.controls['ReturnDate'].value;
    this._reservacionService.reservacion.codePromotion = this.formulario.controls['codePromotion'].value;
    this._reservacionService.reservacion.returnDiferent = this.formulario.controls['returnDiferent'].value;
    this.router.navigate(["reservacionIni"]);
  }
  getCity(id){
    if(id === "")
    {
      id=0;
    }
    this.citys = null;
    this.formulario.get('cityId').setValue("");
    this._config.getCity(id).subscribe(data => {
      this.citys = data;
      this._reservacionService.opcionesReturn = data;
    })
  }

}
