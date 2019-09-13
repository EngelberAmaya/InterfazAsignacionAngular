import { Component, OnInit } from '@angular/core';
import { SofwareService } from '../../services/sofware.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import {  MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class SoftwareComponent implements OnInit {

	listaSoftware:any;
	SoftwareFrom: FormGroup;
  SoftwareFromModificar: FormGroup;

	msgs: any[] = [];

  constructor( private soft: SofwareService,
  			   private confirmationService: ConfirmationService,
               private messageService: MessageService) { }

  ngOnInit() {
  	this.verSoftware();
  	this.FromInit();
  }

  FromInit(){
  	this.SoftwareFrom = new FormGroup/*this.fb.group*/({
      Id : new FormControl(''),
  		SoftwareName: new FormControl('')
  		
  	});
  }

  Limpiar(){
  	this.SoftwareFrom.reset({
  		SoftwareName: ''
  		
  	});
  }

  verSoftware(){
    this.soft.verSofware().subscribe( z => {
    	this.listaSoftware = z;
      console.log(z);
    });
  }


  Guardar(){
  	let g = Object.assign({}, this.SoftwareFrom.value);
  	console.log(g);
  	this.soft.insertarSofware(g).subscribe( x => {
  		console.log(x);
  		this.messageService.add({severity:'success', summary: 'Registro Exitoso', detail:'del Software'});
  		this.verSoftware();
  		this.Limpiar();
  		
  	});
  }


  confirmEliminar(id, softwareName) {
    //console.log(id)
        this.confirmationService.confirm({
            message: 'Desea Eliminar el software '+softwareName+'?',
            header: 'Eliminar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                //this.msgs = [{severity:'info', summary:'Ejecutado', detail:'Has aceptado'}];
                this.Eliminar(id);
                this.messageService.add({severity:'success', summary: 'Eliminado exitosamente', detail:'el Usuario'});

            },
            reject: () => {
                this.msgs = [{severity:'info', summary:'Rechazado', detail:'Has rechazado'}];
            }
        });
  }


  Eliminar(id){
    //let g = Object.assign({}, this.UsuarioFrom.value);
    //console.log(g);

    this.soft.eliminarSoftware(id).then( x => {
      console.log(x);
       
        this.messageService.add({severity:'success', summary: 'Eliminado', detail:'el Software'});
     	this.verSoftware();
    });
  }

  
  EditarSoftware(id, softwareName){
    this.SoftwareFrom.setValue({
      "Id": id,
      "SoftwareName": softwareName
    });

  }


  ModificarSoftware(){
    console.log(this.SoftwareFrom.value);
    
    this.soft.editSoftware(this.SoftwareFrom.value.Id,this.SoftwareFrom.value).then(x => {
      console.log(x);
      this.verSoftware();
    });
    this.messageService.add({severity:'success', summary: 'Modificacion Exitosa', detail:'del Software'});
  }

}
