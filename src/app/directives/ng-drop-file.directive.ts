import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/index';
@Directive({
  selector: '[NgDropFile]'
})
export class NgDropFileDirective {

  @Input() archivos:FileItem[] = [];
  @Output() archivoSobre: EventEmitter<any> = new EventEmitter();
  constructor( public elemento:ElementRef) { }

  @HostListener('dragenter',['$event'])
  public onDragEnter(event:any)
  {
    this.archivoSobre.emit(true);
  }
  @HostListener('dragleave',['$event'])
  public onDragLeave(event:any)
  {
    this.archivoSobre.emit(false);
  }

  @HostListener('dragover',['$event'])
  public onDragOver(event:any)
  {
    let transferencia = this._getTransferencia(event);
    transferencia.dropEffect = 'copy'

    this.archivoSobre.emit(true);
    this._prevenirYDetener(event);
  }
  @HostListener('drop',['$event'])
  public OnDrop(event:any){

    let transferencia = this._getTransferencia(event);
    if(!transferencia){
      return;
    }
    this._agregarArchivos( transferencia.files );

    this._prevenirYDetener(event);

  }

  private _agregarArchivos(archivosLista:FileList){

    for (let propiedad in Object.getOwnPropertyNames( archivosLista )) {
        let archTemporal = archivosLista[propiedad];

        if(this._archivoPuedeSerCargado(archTemporal)){
          let nuevoArchivo = new FileItem(archTemporal);
          this.archivos.push(nuevoArchivo);
        }
    }
    console.log(this.archivos);
  }
  private _getTransferencia(event:any){
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }
  private _archivoPuedeSerCargado(archivo:File ){
    if( this._esImagen(archivo.type) && !this._ArchivoYaFueDroppeado(archivo.name) )
    {
      return true;
    }
    return false;
  }
  private _ArchivoYaFueDroppeado(nombreDelArchivo:string):boolean{
    for(let i in this.archivos)
    {
      let arch = this.archivos[i];
      if(arch.archivo.name == nombreDelArchivo)
      {
        console.log("archivo Ya existe en la lista:",nombreDelArchivo);
        return true;
      }
    }
    return false;
  }
  private _esImagen(tipo:string):boolean{
    return (tipo == '' || tipo == undefined )?false:tipo.startsWith('image');
  }
  private _prevenirYDetener( e:any ){
    e.preventDefault();
    e.stopPropagation();
  }
}
