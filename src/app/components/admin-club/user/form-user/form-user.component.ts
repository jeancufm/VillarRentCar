import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfigService, AlertService } from '../../../../services/index';
@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html'
})
export class FormUserComponent implements OnInit {
  title:string;
  formulario:FormGroup;
  referido:any;
  loading:boolean = false;
  constructor( private activatedRoute:ActivatedRoute, private _config:ConfigService) {
    this.formulario = new FormGroup({
      'id':new FormControl('0'),
      'name':new FormControl('',[Validators.required]),
      'pointReferido':new FormControl(''),
    });
    this.activatedRoute.params.subscribe(p => {
      if(p.id){
        console.log(p.id);
        this.title = "Editar";
        this._config.getReferidoById(p.id).subscribe(data => {
          console.log(data);
          let datos:any = {
            id:data.id,
            name:data.firstname + ' '+ data.lastname,
            pointReferido:data.pointReferido
          }
          this.referido = datos;
          this.formulario.setValue(this.referido);
        });
      }
    });
  }

  ngOnInit() {
  }
  submit() {
    console.log(this.formulario.value);
    this.loading=true;
    this._config.setReferidorData(this.formulario.value).subscribe(()=>{
      this.loading=false;
    });
  }

}
