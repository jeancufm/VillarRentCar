import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../services/index';
declare var $:any;

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styles: []
})
export class CityComponent implements OnInit {
  citys:any;
  constructor(private _config:ConfigService) { }

  ngOnInit() {
    this._config.getAllCity().subscribe(data => {
      this.citys = data;
      setTimeout(function() {   //calls click event after a certain time
        var table = $('#CitysTable').DataTable();
        table.destroy();
        $('#CitysTable').DataTable( {
          "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
          "pagingType": "numbers",
        });
      }, 10);
    });
  }

}
