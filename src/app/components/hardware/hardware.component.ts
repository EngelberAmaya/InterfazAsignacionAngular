import { Component, OnInit } from '@angular/core';
import { HardwareService } from '../../services/hardware.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import {  MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class HardwareComponent implements OnInit {

	listaHardware:any;
	HardwareFrom: FormGroup;

	msgs: any[] = [];

  constructor(private hard: HardwareService,
  			      private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {
  	this.verHardware();
  	this.FromInit();
  }

  FromInit(){
  	this.HardwareFrom = new FormGroup/*this.fb.group*/({
  		Id: new FormControl(''),
  		HardwareName: new FormControl('')
  		
  	});
  }

  Limpiar(){
  	this.HardwareFrom.reset({
  		HardwareName: ''
  		
  	});
  }

  verHardware(){
    this.hard.verHardware().subscribe( z => {
    	this.listaHardware = z;
      console.log(z);
    });
  }

  Guardar(){
  	let g = Object.assign({}, this.HardwareFrom.value);
  	console.log(g);
  	this.hard.insertarHardware(g).subscribe( x => {
  		console.log(x);
  		this.messageService.add({severity:'success', summary: 'Registro Exitoso', detail:'del Hardware'});
  		this.verHardware();
  		this.Limpiar();
  		
  	});
  }


  confirmEliminar(id, hardwareName) {
    //console.log(id)
        this.confirmationService.confirm({
            message: 'Desea Eliminar el hardware '+hardwareName+'?',
            header: 'Eliminar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                //this.msgs = [{severity:'info', summary:'Ejecutado', detail:'Has aceptado'}];
                this.Eliminar(id);
                this.messageService.add({severity:'success', summary: 'Eliminado exitosamente', detail:'el Usuario'});
                //this.verHardware();
            },
            reject: () => {
                this.msgs = [{severity:'info', summary:'Rechazado', detail:'Has rechazado'}];
            }
        });
  }


  Eliminar(id){
    //let g = Object.assign({}, this.UsuarioFrom.value);
    //console.log(g);

    this.hard.eliminarHardware(id).then( x => {
      console.log(x);
      this.messageService.add({severity:'success', summary: 'Eliminado', detail:'el Software'});
     	this.verHardware();
    });
  }


  EditarHardware(id,hardwareName){
    this.HardwareFrom.setValue({
      "Id": id,
      "HardwareName": hardwareName
    });

  }


  ModificarHardware(){
    console.log(this.HardwareFrom.value);
    
    this.hard.editHardware(this.HardwareFrom.value.Id,this.HardwareFrom.value).then(x => {
      console.log(x);
      this.verHardware();
    });
    this.messageService.add({severity:'success', summary: 'Modificacion Exitosa', detail:'del Hardware'});
  }

}
