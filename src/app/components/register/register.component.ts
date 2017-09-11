import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, UserService } from '../../services/index';
import { AlertComponent } from '../../directives/index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
declare var $:any;
import { User, Login} from '../../models/index';

@Component({
    selector: 'app-register',
    moduleId: module.id.toString(),
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    loading = false;
    formulario:FormGroup;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) {
          this.formulario = new FormGroup({
            'firstName':new FormControl('',[Validators.required]),
            'lastName':new FormControl('',[Validators.required]),
            'birthdate':new FormControl('',[Validators.required]),
            'city':new FormControl('',[Validators.required]),
            'country':new FormControl('',[Validators.required]),
            'state':new FormControl('',[Validators.required]),
            'phone':new FormControl('',[Validators.required]),
            'mail':new FormControl('',[Validators.required,
                                       Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")],
                                        this.existeUsuario.bind(this)),
            'password':new FormControl('',[Validators.required]),
            'RepeatPassword':new FormControl(''),
            'direction':new FormControl('',[Validators.required]),
            'codePromotor':new FormControl('')
          });
          this.formulario.controls['RepeatPassword'].setValidators([
            Validators.required,
            this.noIgual.bind(this.formulario)
          ])
        }

    noIgual( control:FormControl ): { [s:string]:boolean }{
      let forma:any = this;
        if(control.value !== forma.controls['password'].value )
        {
          return {
            noiguales:true
          }
        }
        return null;
          }
    existeUsuario(control:FormControl): Promise<any>|Observable<any>{
      let promesa = new Promise(
        (resolve, reject)=>{
          setTimeout(
            ()=>{
              this.userService.validMail(control.value).subscribe(data =>{
              let response = data.json();
              if(response.length > 0)
              {
                resolve({existe:true});
              }else{
                resolve(null);
              }
            });
          },1000)
        }
      )
      return promesa;

    }
    register() {
        this.userService.create(this.formulario.value)
            .subscribe(
                data => {
                    this.loading = false;
                    this.alertService.success('Registration successful', true);
                    $('#login').show();
                    $('#register').hide();
                    $('#TitleLogin span').text('Iniciar Sesión');
                    this.formulario.reset();
                },
                error => {
                    console.log(error);
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    cancelar(){
      $('#LoginModal').modal('hide');
    }
}
