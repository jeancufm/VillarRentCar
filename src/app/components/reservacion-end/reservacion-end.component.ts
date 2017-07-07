import { Component, OnInit } from '@angular/core';
import { ReservacionService,UserInfoService,FleetService,AuthenticationService, ConfigService,AlertService } from '../../services/index';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-reservacion-end',
  templateUrl: './reservacion-end.component.html'
})
export class ReservacionEndComponent implements OnInit {

  path:string;
  image1:string;
  image2:string;
  image3:string;
  rentVehicleInfo:any = {
    vehicleInfo:{
      proteccion:["S"],
      tarifaDiaria:0
    },
    fleetInfo:{
      conductorAdicional:[false,0],
      conductorMenorDeEdad:[false,0],
      proteccionContraRobosDeAccessorios:[false,0],
      accidentesPersonales:[false,0],
      excesoRCV:[false,0]
    },
    IVA:0
  }
  Subtotal:number = 0;
  VehicleInfo:any;
  FleetInfo:any;
  today = new Date();
  dayReservation:number = 0;
  constructor(private auth:AuthenticationService,
              private userinfo:UserInfoService,
              private _reservacionService:ReservacionService,
              private _fleetService:FleetService,
              private _router:Router,
              private _ConfigService:ConfigService,
              private _AlertService:AlertService) { }
  ageSelect:string[] = ["18","19","20","21","22","23","24","25","26","27","28","29","30-69","70+"];
  ngOnInit() {
    if(!this._reservacionService.reservacion.idVehicle || this._reservacionService.reservacion.fleetId == 0)
    {
      this._router.navigate(['home']);
    }else{

      if(this._reservacionService.reservacion.CityId && this._reservacionService.reservacion.returnDiferent)
      {
        this._reservacionService.reservacion.returnCityId = this._reservacionService.reservacion.CityId;
      }
      this._fleetService.getVehicleInfo(this._reservacionService.reservacion.idVehicle).subscribe(data =>{
                                          this.VehicleInfo = data[0];
                                          this.path="http://localhost:90/VillaCarApi/uploads/"+this.VehicleInfo.idCountry+"/"+this.VehicleInfo.idCity+"/"
                                                    +this.VehicleInfo.idFleet+"/"+this.VehicleInfo.idVehicle+"/";
                                          this.image1 = this.VehicleInfo.image1;
                                          this.image2 = this.VehicleInfo.image2;
                                          this.image3 = this.VehicleInfo.image3;
                                          this._ConfigService.getTypeFleet(this._reservacionService.reservacion.fleetId)
                                              .subscribe(data =>{
                                                          if(data.length>0)
                                                          {
                                                            this.FleetInfo = data[0];
                                                            this.sumar();
                                                          }
                                                        })
                                        });
      this.setInitLocation(this._reservacionService.reservacion.CountryId);
    }
  }
  setInitLocation(opcion){
    this._reservacionService.reservacion.returnCityId = 0;
    this._reservacionService.reservacion.CountryId = opcion;
    this._reservacionService.opcionesReturn = [];
    this._ConfigService.getCity(this._reservacionService.reservacion.CountryId).subscribe(resp => {
      this._reservacionService.opcionesReturn = resp
    });
  }
  reservacionEnd(forma:any){
    if(!this.auth.authenticated())
    {
      $('#LoginModal').modal('show');
      return;
    }

    this._reservacionService.reservacion.returnCityId = this._reservacionService.reservacion.returnDiferent?this._reservacionService.reservacion.returnCityId:this._reservacionService.reservacion.CityId;

    let reservacion = this.asignarDatos(forma.value);
    this._reservacionService.SolicitudReservacion(reservacion);
    this._reservacionService.reservacion = {
      CountryId:0,
      CityId:0,
      fleetId:0,
      returnCityId:0,
      ReturnDate:new Date(),
      InitDate:new Date(),
      age:"",
      returnDiferent:false,
      mail:"",
      codePromotion:"",
      idVehicle:0
    };
    this._AlertService.success("Registration sucessful",true);
  }
  cancelar(){
    this._reservacionService.reservacion = {
      CountryId:0,
      CityId:0,
      fleetId:0,
      returnCityId:0,
      ReturnDate:new Date(),
      InitDate:new Date(),
      age:"",
      returnDiferent:false,
      mail:"",
      codePromotion:"",
      idVehicle:0
    };
    this._router.navigate(['home']);
  }
  sumar(){
    let subTotal = 0;
    subTotal = subTotal + (+this.VehicleInfo.priceDiary)*(this.dayReservation > 1 ? this.dayReservation:1);
    subTotal = subTotal + (this.rentVehicleInfo.vehicleInfo.proteccion == "C"?(+this.VehicleInfo.protectionPrice):0);
    subTotal = subTotal + (this.rentVehicleInfo.fleetInfo.conductorAdicional[0] == true?(+this.FleetInfo.aditionalDrivePrice):0);
    subTotal = subTotal + (this.rentVehicleInfo.fleetInfo.conductorMenorDeEdad[0] == true?(+this.FleetInfo.minorDriverPrice):0);
    subTotal = subTotal + (this.rentVehicleInfo.fleetInfo.proteccionContraRobosDeAccessorios[0] == true?(+this.VehicleInfo.protectionAgainstTheftPrice):0);
    subTotal = subTotal + (this.rentVehicleInfo.fleetInfo.accidentesPersonales[0] == true?(+this.VehicleInfo.personalAccidentInsurancePrice):0);
    subTotal = subTotal + (this.rentVehicleInfo.fleetInfo.excesoRCV[0] == true?(+this.VehicleInfo.excessLimitRCVPrice):0);
    this.Subtotal = subTotal;
  }
  asignarDatos(formulario:any){
    let idUser = this.auth.getProfile().id;
    let reservacion:any = {
      id:0,
      priceDiary: + (this.VehicleInfo.priceDiary),
      protectionPrice: + (this.rentVehicleInfo.vehicleInfo.proteccion == "C"?(+this.VehicleInfo.protectionPrice):0),
      aditionalDrivePrice: + (this.rentVehicleInfo.fleetInfo.conductorAdicional[0] == true?(+this.FleetInfo.aditionalDrivePrice):0),
      minorDriverPrice: + (this.rentVehicleInfo.fleetInfo.conductorMenorDeEdad[0] == true?(+this.FleetInfo.minorDriverPrice):0),
      protectionAgainstTheftPrice: + (this.rentVehicleInfo.fleetInfo.proteccionContraRobosDeAccessorios[0] == true?(+this.VehicleInfo.protectionAgainstTheftPrice):0),
      personalAccidentInsurancePrice: + (this.rentVehicleInfo.fleetInfo.accidentesPersonales[0] == true?(+this.VehicleInfo.personalAccidentInsurancePrice):0),
      excessLimitRCVPrice: + (this.rentVehicleInfo.fleetInfo.excesoRCV[0] == true?(+this.VehicleInfo.excessLimitRCVPrice):0),
      Descount: 0,
      VehicleId: this.VehicleInfo.id,
      CountDays:0,
      SubTotal: this.Subtotal,
      IVA: (this.FleetInfo.iva/100) * this.Subtotal,
      Total:((this.FleetInfo.iva/100) * this.Subtotal)+ this.Subtotal,
      CodeDescount:0,
      userId: idUser,
      returnCityId:    this._reservacionService.reservacion.returnDiferent?this._reservacionService.reservacion.returnCityId:this._reservacionService.reservacion.CityId,
      initDate:formulario.InitDate,
      returnDate:formulario.ReturnDate,
      StatusId:3,
      isDelete:0
    }
    return reservacion;

  }

}
