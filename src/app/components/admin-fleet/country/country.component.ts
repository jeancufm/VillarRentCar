import { Component } from '@angular/core';
import { ConfigService } from '../../../services/index';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styles: []
})
export class CountryComponent  {
  countrys:any;
  constructor(private _config:ConfigService,  private router:Router) {
    this._config.getCountry().subscribe(data => {
      this.countrys = data;
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

}
