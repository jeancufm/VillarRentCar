import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../services/index';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {
  referidores:any;
  constructor(private _config:ConfigService,  private router:Router) {
    this._config.getReferidores().subscribe(data => {
      this.referidores = data;
      setTimeout(function() {   //calls click event after a certain time
        var table = $('#CountrysTable').DataTable();
        table.destroy();
        $('#CountrysTable').DataTable( {
          "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
          "pagingType": "numbers",
        });
      }, 10);
    });
  }

  ngOnInit() {
  }

}
