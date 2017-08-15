import { Component, OnInit,OnDestroy } from '@angular/core';
import { UserInfoService } from '../../services/user-info.service';
declare var $;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit,OnDestroy {
  constructor(private userInfo:UserInfoService) {
    $('body').css('background-color','#000');
  }

  ngOnInit() {
  }
  ngOnDestroy(){
    $('body').css('background-color','#fff');
  }
}
