import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, UserService } from '../../services/index';
import { AlertComponent } from '../../directives/index';

declare var $:any;

@Component({
    selector: 'app-login',
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private _auth: UserService,
        private alertService: AlertService) { }


    login() {
        this.loading = true;
        this._auth.authenticate(this.model)
            .subscribe(
                data => {
                    if(data.json().id != undefined ){
                      let user = data.json();
                        if (user) {
                            // store user details and jwt token in local storage to keep user logged in between page refreshes
                            localStorage.setItem('currentUser', JSON.stringify(user));
                        }
                        this.loading = false;
                        $('#LoginModal').modal('hide');
                    }
                    else{
                      this.alertService.error("Usuario o clave incorrectos");
                      this.loading = false;
                    }

                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    register(){
      $('#login').hide();
      $('#register').show();
      $('#TitleLogin span').text('Registrarse');
    }
}
