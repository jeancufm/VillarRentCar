import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../services/index';

declare var $:any;

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styles: []
})
export class VehiclesComponent implements OnInit {
  vehicles:any;
  
  constructor(private _config:ConfigService) {
  }

  ngOnInit() {
    this._config.getAllVehicles().subscribe(data => {
        this.vehicles = data;
        setTimeout(function() {   //calls click event after a certain time
          var table = $('#vehiclesTable').DataTable();
          table.destroy();
          $('#vehiclesTable').DataTable( {
            "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
            "pagingType": "numbers",
          });
        }, 10);
      });
  }
}
