import { Component } from '@angular/core';
import { ConfigService } from '../../../services/index';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-type-fleet',
  templateUrl: './type-fleet.component.html',
  styles: []
})
export class TypeFleetComponent {
  typeFleets:any;
  constructor(private _config:ConfigService,  private router:Router) {
    this._config.getAllTypeFleet().subscribe(data => {
      this.typeFleets = data;
      setTimeout(function() {   //calls click event after a certain time
        var table = $('#typeFleetTable').DataTable();
        table.destroy();
        $('#typeFleetTable').DataTable( {
          "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
          "pagingType": "numbers",
        });
      }, 10);
    });
  }
}
