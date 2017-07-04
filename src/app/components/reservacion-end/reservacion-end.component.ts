import { Component, OnInit } from '@angular/core';
import { ReservacionService,UserInfoService,FleetService,AuthenticationService, ConfigService } from '../../services/index';
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
              private _ConfigService:ConfigService) { }
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
                                          console.log(this.VehicleInfo);
                                          this.path="http://localhost:90/VillaCarApi/uploads/"+this.VehicleInfo.idCountry+"/"+this.VehicleInfo.idCity+"/"
                                                    +this.VehicleInfo.idFleet+"/"+this.VehicleInfo.idVehicle+"/";
                                          this.image1 = this.VehicleInfo.image1;
                                          this.image2 = this.VehicleInfo.image2;
                                          this.image3 = this.VehicleInfo.image3;
                                          console.log(this.image1);
                                          this._ConfigService.getTypeFleet(this._reservacionService.reservacion.fleetId)
                                              .subscribe(data =>{
                                                          if(data.length>0)
                                                          {
                                                            this.FleetInfo = data[0];
                                                            this.sumar();
                                                          }
                                                        })
                                        });

      this._reservacionService.searchCityForCountryOnly(this._reservacionService.reservacion.CountryId)
      .subscribe(data => {
        this._reservacionService.opciones = data
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
    console.log(forma);
    if(!this.auth.authenticated())
    {
      console.log("aqui");
      $('#LoginModal').modal('show');
      return;
    }
    if(this._reservacionService.reservacion.CityId && this._reservacionService.reservacion.returnDiferent)
    {
      this._reservacionService.reservacion.returnCityId = this._reservacionService.reservacion.CityId;
    }
    console.log("enviar correo");
    console.log(this._reservacionService.reservacion);
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
    subTotal = subTotal + (this.rentVehicleInfo.fleetInfo.proteccionContraRobosDeAccessorios[0] == true?(+this.FleetInfo.protectionAgainstTheftPrice):0);
    subTotal = subTotal + (this.rentVehicleInfo.fleetInfo.accidentesPersonales[0] == true?(+this.FleetInfo.personalAccidentInsurancePrice):0);
    subTotal = subTotal + (this.rentVehicleInfo.fleetInfo.excesoRCV[0] == true?(+this.FleetInfo.excessLimitRCVPrice):0);
    this.Subtotal = subTotal;
  }
  asignarDatos(){
    let priceDiary = this.VehicleInfo.priceDiary;
    let protectionPrice = + (this.rentVehicleInfo.vehicleInfo.proteccion == "C"?(+this.VehicleInfo.protectionPrice):0);
    let aditionalDrivePrice = + (this.rentVehicleInfo.fleetInfo.conductorAdicional[0] == true?(+this.FleetInfo.aditionalDrivePrice):0);
    let minorDriverPrice = + (this.rentVehicleInfo.fleetInfo.conductorMenorDeEdad[0] == true?(+this.FleetInfo.minorDriverPrice):0);
    let protectionAgainstTheftPrice = + (this.rentVehicleInfo.fleetInfo.proteccionContraRobosDeAccessorios[0] == true?(+this.FleetInfo.protectionAgainstTheftPrice):0);
    let personalAccidentInsurancePrice = + (this.rentVehicleInfo.fleetInfo.accidentesPersonales[0] == true?(+this.FleetInfo.personalAccidentInsurancePrice):0);
    let excessLimitRCVPrice = + (this.rentVehicleInfo.fleetInfo.excesoRCV[0] == true?(+this.FleetInfo.excessLimitRCVPrice):0);
    let Descount = 0;
    let VehicleId = this._reservacionService.reservacion.idVehicle;

    let CountDays;
    let SubTotal;
    let IVA;
    let Total;
    let CodeDescount;
    let userId;
    let returnCityId;
    let initDate;
    let returnDate;
  }

}
