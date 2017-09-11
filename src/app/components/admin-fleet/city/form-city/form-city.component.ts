import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService, AlertService } from '../../../../services/index';
import { AlertComponent } from '../../../../directives/index';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-city',
  templateUrl: './form-city.component.html',
  styles: []
})
export class FormCityComponent  {

  countrys:any;
  city:any;
  formulario:FormGroup;
  title:string;
  loading:boolean = false;
  constructor(private activatedRoute:ActivatedRoute,
              private _config:ConfigService,
              private alertService: AlertService) {
                this.city = null;
                this.formulario = new FormGroup({
                  'id':new FormControl('0'),
                  'name':new FormControl('',[Validators.required]),
                  'CountryId':new FormControl(''),
                  'isDelete':new FormControl(''),
                });

                this.activatedRoute.params.subscribe(p => {
                  if(p.id){
                    this.title = "Editar";
                    this._config.getCityById(p.id).subscribe(data => {
                      let datos:any = {
                        id:data.id,
                        name:data.name,
                        CountryId:data.countryId,
                        isDelete: (data.isDelete == "1"?true:false)
                      }
                      this.city = datos;
                      this.formulario.setValue(this.city);
                    });
                  }else{
                    let nuevo:any = {
                      id:0,
                      name:"",
                      CountryId:"",
                      isDelete:false
                    }
                    this.title = "Nuevo";
                    this.formulario.setValue(nuevo);
                  }
                });

                this._config.getCountry().subscribe(data => {
                  this.countrys = data;
                })

              }

    submit() {
      this.loading=true;
      this._config.setCity(this.formulario.value).subscribe(()=>{
        this.loading=false;
      });
    }
}
