import { Component, OnInit,OnDestroy } from '@angular/core';
import { UserInfoService, ConfigService } from '../../services/index';
declare var $;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit,OnDestroy {
  constructor(private userInfo:UserInfoService, private _config:ConfigService) {
    $('body').css('background-color','#000');
    this._config.ruta = 'home';
  }

  ngOnInit() {
  }
  ngOnDestroy(){
    $('body').css('background-color','#fff');
  }
}
