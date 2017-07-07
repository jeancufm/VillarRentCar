import { Component } from '@angular/core';
import { ConfigService } from '../../../services/index';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-reservacionOperaciones',
  templateUrl: './reservacionOperaciones.component.html',
  styles: []
})
export class ReservacionOperacionesComponent  {

  reservaciones:any;
  constructor(private _config:ConfigService,  private router:Router) {
    this._config.getReservation().subscribe(data => {
      this.reservaciones = data;
      setTimeout(function() {   //calls click event after a certain time
        var table = $('#reservacionTable').DataTable();
        table.destroy();
        $('#reservacionTable').DataTable( {
          "lengthMenu": [[5, 10, 20, -1], [5, 10, 20, "All"]],
          "pagingType": "numbers",
        });
      }, 10);
    });
  }

}
