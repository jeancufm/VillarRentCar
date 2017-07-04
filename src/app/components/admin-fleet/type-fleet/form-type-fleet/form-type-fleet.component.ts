import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService, AlertService } from '../../../../services/index';
import { AlertComponent } from '../../../../directives/index';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-type-fleet',
  templateUrl: './form-type-fleet.component.html',
  styles: []
})
export class FormTypeFleetComponent {
  typeFleet:any;
  title:string;
  loading:boolean;
  formulario:FormGroup;
  citys:any;
  constructor(private activatedRoute:ActivatedRoute,
              private _config:ConfigService,
              private alertService: AlertService) {
                this.typeFleet = null;
                this.formulario = new FormGroup({
                  'id':new FormControl('0'),
                  'cityId':new FormControl('',[Validators.required]),
                  'name':new FormControl('',[Validators.required]),
                  'aditionalDrivePrice':new FormControl('0',[Validators.required]),
                  'minorDriverPrice':new FormControl('0',[Validators.required]),
                  'protectionAgainstTheftPrice':new FormControl('0',[Validators.required]),
                  'personalAccidentInsurancePrice':new FormControl('0',[Validators.required]),
                  'excessLimitRCVPrice':new FormControl('0',[Validators.required]),
                  'iva':new FormControl('0',[Validators.required]),
                  'isDelete':new FormControl(''),
                });
              this.activatedRoute.params.subscribe(p => {
        if(p.id){
          this.title = "Editar";
          this._config.getTypeFleetsById(p.id).subscribe(data => {
            let datos:any = {
              id:data.id,
              cityId:data.cityId,
              name:data.name,
              aditionalDrivePrice:data.aditionalDrivePrice,
              minorDriverPrice:data.minorDriverPrice,
              protectionAgainstTheftPrice:data.protectionAgainstTheftPrice,
              personalAccidentInsurancePrice:data.personalAccidentInsurancePrice,
              excessLimitRCVPrice:data.excessLimitRCVPrice,
              iva:data.iva,
              isDelete: (data.isDelete == "1"?true:false)
            }
            this.typeFleet = datos;
            this.formulario.setValue(this.typeFleet);
          });
        }else{
          let nuevo:any = {
            id:'',
            cityId:'',
            name:'',
            aditionalDrivePrice:'',
            minorDriverPrice:'',
            protectionAgainstTheftPrice:'',
            personalAccidentInsurancePrice:'',
            excessLimitRCVPrice:'',
            iva:'',
            isDelete: false
          }
          this.title = "Nuevo";
          this.formulario.setValue(nuevo);
        }
      });
              this._config.getAllCity().subscribe(data => {
                this.citys=data;
              })
  }
  submit() {
    console.log(this.formulario.value);
    this.loading=true;
    //console.log(this.formulario.value);
   this._config.setTypeFleet(this.formulario.value).subscribe(()=>{
      this.loading=false;
    });
  }


}
