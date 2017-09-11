import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigService, AlertService } from '../../../../services/index';
@Component({
  selector: 'app-form-promotor',
  templateUrl: './form-promotor.component.html',
  styles: []
})
export class FormPromotorComponent implements OnInit {
  title:string;
  formulario:FormGroup;
  promotor:any;
  loading:boolean = false;

  constructor( private activatedRoute:ActivatedRoute, private _config:ConfigService) {
    this.formulario = new FormGroup({
      'id':new FormControl('0'),
      'name':new FormControl('',[Validators.required]),
      'pointPromotor':new FormControl(''),
    });
    this.activatedRoute.params.subscribe(p => {
      if(p.id){
        console.log(p.id);
        this.title = "Editar";
        this._config.getPromotorById(p.id).subscribe(data => {
          console.log(data);
          let datos:any = {
            id:data.id,
            name:data.name,
            pointPromotor:data.pointPromotor
          }
          this.promotor = datos;
          this.formulario.setValue(this.promotor);
        });
      }
    });
  }

  ngOnInit() {
  }
  submit() {
    console.log(this.formulario.value);
    this.loading=true;
    this._config.setPromotorData(this.formulario.value).subscribe(()=>{
      this.loading=false;
    });
  }
}
