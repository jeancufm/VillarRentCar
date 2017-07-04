import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService, AlertService } from '../../../../services/index';
import { AlertComponent } from '../../../../directives/index';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-country',
  templateUrl: './form-country.component.html'
})
export class FormCountryComponent {
  country:any;
  title:string;
  loading:boolean;
  formulario:FormGroup;
  constructor(private activatedRoute:ActivatedRoute,
              private _config:ConfigService,
              private alertService: AlertService) {
                this.country = null;
                this.formulario = new FormGroup({
                  'id':new FormControl('0'),
                  'name':new FormControl('',[Validators.required]),
                  'isDelete':new FormControl(''),
                });

      this.activatedRoute.params.subscribe(p => {
        if(p.id){
          this.title = "Editar";
          this._config.getCountryById(p.id).subscribe(data => {
            let datos:any = {
              id:data.id,
              name:data.name,
              isDelete: (data.isDelete == "1"?true:false)
            }
            this.country = datos;
            this.formulario.setValue(this.country);
          });
        }else{
          let nuevo:any = {
            id:0,
            name:"",
            isDelete:false
          }
          this.title = "Nuevo";
          this.formulario.setValue(nuevo);
        }
      });
  }
  submit() {
    console.log(this.formulario.value);
    this.loading=true;
    //console.log(this.formulario.value);
    this._config.setCountry(this.formulario.value).subscribe(()=>{
      this.loading=false;
    });
  }

}
