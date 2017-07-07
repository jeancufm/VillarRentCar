import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService, AlertService, ReservacionService } from '../../../../services/index';
import { AlertComponent } from '../../../../directives/index';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'edit-reservacion',
  templateUrl: './edit-reservacion.component.html'
})
export class EditReservacionComponent {
  reservacion:any;
  countrys:any;
  citys:any;
  typeFleets:any;
  vehicles:any;
  statuses:any;
  title:string;
  loading:boolean;
  formulario:FormGroup;
  constructor(private activatedRoute:ActivatedRoute,
              private _config:ConfigService,
              private alertService: AlertService,
              private _ReservacionService: ReservacionService) {
                this.reservacion = null;
                this.formulario = new FormGroup({
                  'id':new FormControl('0'),
                  'userId':new FormControl('0',Validators.required),
                  'initDate': new FormControl('0',Validators.required),
                  'returnDate': new FormControl('0',Validators.required),
                  'CountDays':new FormControl('0',Validators.required),
                  'country':new FormControl('0',Validators.required),
                  'city':new FormControl('',Validators.required),
                  'returnCityId':new FormControl('0',Validators.required),
                  'typefleet':new FormControl('0',Validators.required),
                  'VehicleId':new FormControl('0',Validators.required),
                  'priceDiary':new FormControl('0',Validators.required),
                  'protectionPrice':new FormControl('0',Validators.required),
                  'excessLimitRCVPrice':new FormControl('0',Validators.required),
                  'protectionAgainstTheftPrice':new FormControl('0',Validators.required),
                  'minorDriverPrice':new FormControl('0',Validators.required),
                  'personalAccidentInsurancePrice':new FormControl('0',Validators.required),
                  'aditionalDrivePrice':new FormControl('0',Validators.required),
                  'CodeDescount':new FormControl('0',Validators.required),
                  'Descount':new FormControl('0',Validators.required),
                  'SubTotal':new FormControl('0',Validators.required),
                  'IVA':new FormControl('0',Validators.required),
                  'Total':new FormControl('0',Validators.required),
                  'StatusId':new FormControl('0',Validators.required),
                  'mail':new FormControl('0',Validators.required),
                  'isDelete':new FormControl(''),
                });
      this.activatedRoute.params.subscribe(p => {
          this.title = "Editar";
          this._config.getReservation(p.id).subscribe(data => {
            let datos:any = {
              id:data[0].id,
              userId:data[0].userId,
              initDate:data[0].initDate,
              returnDate:data[0].returnDate,
              CountDays:data[0].CountDays,
              country:data[0].countryId,
              city:data[0].cityId,
              returnCityId:data[0].returnCityId,
              typefleet:data[0].typeFleetId,
              VehicleId:data[0].VehicleId,
              priceDiary:data[0].priceDiary,
              protectionPrice:data[0].protectionPrice,
              excessLimitRCVPrice:data[0].excessLimitRCVPrice,
              protectionAgainstTheftPrice:data[0].protectionAgainstTheftPrice,
              minorDriverPrice:data[0].minorDriverPrice,
              personalAccidentInsurancePrice:data[0].personalAccidentInsurancePrice,
              aditionalDrivePrice:data[0].aditionalDrivePrice,
              CodeDescount:data[0].CodeDescount,
              Descount:data[0].Descount,
              SubTotal:data[0].SubTotal,
              IVA:data[0].IVA,
              Total:data[0].Total,
              StatusId:data[0].StatusId,
              mail:data[0].mail,
              isDelete: (data[0].isDelete == "1"?true:false)
            }
            this.reservacion = datos;
            this.formulario.setValue(this.reservacion);
            this._config.getCountry().subscribe(
              data => {
                  this.countrys = data;
            });
            this._config.getCity(datos.country).subscribe(data => {
              this.citys = data;
            });
            this._config.getTypeFleet(datos.city).subscribe(data => {
              this.typeFleets = data;
            });
            this._config.getVehicles(datos.typefleet).subscribe(data =>{
              this.vehicles = data;
            })
            this._config.getStatus().subscribe(data =>{
              this.statuses = data;
            })
          });
      });
  }
  onChangeTypeFleet(id:number){
    this.vehicles = null;
    this.formulario.get('VehicleId').setValue('');
    if(id>0){
      this._config.getVehicles(id).subscribe(data =>{
        this.vehicles = data;
      });
    }

  }
  onChangeCity(id:number){
    this.vehicles = null;
    this.typeFleets = null;
    this.formulario.get('typefleet').setValue('');
    this.formulario.get('VehicleId').setValue('');
    if(id>0){
      this._config.getTypeFleet(id).subscribe(data =>{
        this.typeFleets = data;
      });
    }

  }
  onChangeCountry(id:number){
    this.formulario.get('returnCityId').setValue('');
    this.formulario.get('typefleet').setValue('');
    this.formulario.get('VehicleId').setValue('');
    this.vehicles = null;
    this.typeFleets = null;
    this.citys = null;
    if(id>0){
      this._config.getCity(id).subscribe(data =>{
        this.citys = data;
      });
    }

  }
  submit() {
    this.loading=true;
    this._ReservacionService.SolicitudReservacion(this.formulario.value).subscribe(()=>{
      this.loading=false;
    });
  }

}
