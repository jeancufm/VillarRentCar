import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService, AlertService } from '../../../../services/index';
import { AlertComponent } from '../../../../directives/index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileItem } from '../../../../models/index';


@Component({
  selector: 'app-form-vehicles',
  templateUrl: './form-vehicles.component.html',
  styles: []
})
export class FormVehiclesComponent  {

  vehicle:any;
  title:string;
  loading:boolean;
  formulario:FormGroup;
  typeFleets:any;
  estaSobreDropZone:boolean = false;
  permiteCargar:boolean = true;
  archivos:FileItem[] = [];
  constructor(private activatedRoute:ActivatedRoute,
              private _config:ConfigService,
              private alertService: AlertService) {
                this.vehicle = null;
                this.formulario = new FormGroup({
                  'id':new FormControl('0'),
                  'fleetId':new FormControl('',[Validators.required]),
                  'brand':new FormControl('',[Validators.required]),
                  'model':new FormControl('',[Validators.required]),
                  'priceDiary':new FormControl('0',[Validators.required]),
                  'protectionPrice':new FormControl('0',[Validators.required]),
                  'deductible':new FormControl('0',[Validators.required]),
                  'personalAccidentInsurancePrice':new FormControl('0',[Validators.required]),
                  'excessLimitRCVPrice':new FormControl('0',[Validators.required]),
                  'transmission':new FormControl('0',[Validators.required]),
                  'year':new FormControl('0',[Validators.required]),
                  'type':new FormControl('0',[Validators.required]),
                  'passengers':new FormControl('0',[Validators.required]),
                  'rubbers':new FormControl('0',[Validators.required]),
                  'spareRubbers':new FormControl('0',[Validators.required]),
                  'protectionAgainstTheftPrice':new FormControl('0',[Validators.required]),
                  'isDelete':new FormControl('')
                });
              this.activatedRoute.params.subscribe(p => {
        if(p.id){
          this.title = "Editar";
          this._config.getVehicleById(p.id).subscribe(data => {
            let datos:any = {
              id:data.id,
              fleetId:data.fleetId,
              brand:data.brand,
              model:data.model,
              priceDiary:data.priceDiary,
              protectionPrice:data.protectionPrice,
              deductible:data.deductible,
              transmission:data.transmission,
              year:data.year,
              type:data.type,
              passengers:data.passengers,
              rubbers:data.rubbers,
              spareRubbers:data.spareRubbers,
              personalAccidentInsurancePrice:data.personalAccidentInsurancePrice,
              excessLimitRCVPrice:data.excessLimitRCVPrice,
              protectionAgainstTheftPrice:data.protectionAgainstTheftPrice,
              isDelete: (data.isDelete == "1"?true:false)
            }
            this.vehicle = datos;
            this.formulario.setValue(this.vehicle);
          });
        }else{
          let nuevo:any = {
            id:'0',
            fleetId:'',
            brand:'',
            model:'',
            priceDiary:'',
            protectionPrice:'',
            deductible:'',
            transmission:'',
            year:'',
            type:'',
            passengers:'',
            rubbers:'',
            spareRubbers:'',
            personalAccidentInsurancePrice:'',
            excessLimitRCVPrice:'',
            protectionAgainstTheftPrice:'',
            isDelete: false
          }
          this.title = "Nuevo";
          this.formulario.setValue(nuevo);
        }
      });
      this._config.getAllTypeFleet().subscribe(data => {
        this.typeFleets=data;
      })
  }

  archivoSobreDropZone(e:any){
    this.estaSobreDropZone = e;
  }


  submit() {
    this.loading=true;
    let files:File[] = [];
    for (let archivo of this.archivos) {
        files.push(archivo.archivo);
    }

   this._config.setVehicles(this.formulario.value,files).subscribe(() => {
     this.loading = false;
   });
  }
  onChangeFleet(id:number){
    this._config.getTypeFleetsById(id).subscribe( data =>{
      this.formulario.get('protectionAgainstTheftPrice').setValue(data.protectionAgainstTheftPrice);
      this.formulario.get('personalAccidentInsurancePrice').setValue(data.personalAccidentInsurancePrice);
      this.formulario.get('excessLimitRCVPrice').setValue(data.excessLimitRCVPrice);
    });
  }

}
