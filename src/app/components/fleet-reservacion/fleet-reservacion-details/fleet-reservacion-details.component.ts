import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservacionService } from '../../../services/reservacion.service';
@Component({
  selector: 'app-fleet-reservacion-details',
  templateUrl: './fleet-reservacion-details.component.html',
  styles: []
})
export class FleetReservacionDetailsComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,
              private _reservacionService:ReservacionService) {
    this.activatedRoute.params.map(p => {
      this._reservacionService.reservacion.idVehicle = p.id;
    }).subscribe( ()=>{
        window.scroll(0,0);
     })

}

  ngOnInit() {

  }

}
