import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../services/index';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-promotor',
  templateUrl: './promotor.component.html',
  styles: []
})
export class PromotorComponent implements OnInit {
  promotors:any;
  constructor(private _config:ConfigService,  private router:Router) {
    this._config.getPromotors().subscribe(data => {
      this.promotors = data;
      console.log(this.promotors);
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
