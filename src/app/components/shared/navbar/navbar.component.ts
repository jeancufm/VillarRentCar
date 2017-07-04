import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../../../services/user-info.service';
import {AuthenticationService } from '../../../services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  language:string = "es";
  located:string;
  constructor(private _userInfoService:UserInfoService,
              private _authenticationService:AuthenticationService,
              private router:Router) {
                this._userInfoService.getUbicacion().subscribe( data => this._userInfoService.countryLocated = data );

  }

  ngOnInit() {
    this.DetectarIdioma();
  }
  logout(){
    this._authenticationService.logout();
    this.router.navigate(['home']);
  }
  DetectarIdioma(){
    let language = navigator.language;
        if (language == null) {
      	language = navigator.language;
      	if (language == null)
      		language = "es";
      }
      this.language = language.substring(0, 2);
  }
}
