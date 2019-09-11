import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../../services/assignment.service';
import { UsuarioService } from '../../services/usuario.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import {  MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
// hardware
import { HardwareService } from '../../services/hardware.service';
// software
import { SofwareService } from '../../services/sofware.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AssignmentComponent implements OnInit {

  listaUsuario:any;
  listaHardware:any;
  listaSoftware:any;
  listAsignaciones:any;

  user: any;
  msgs: any[] = [];
  UsuarioFrom: FormGroup;
  AssignmentFrom: FormGroup;
  assignment: any;


 name:any;

 mostrar = false;


  constructor(private asig: AssignmentService,
  			      private usuarioSev: UsuarioService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private soft: SofwareService,
              private hard: HardwareService) { 

    this.user = [];
    this.assignment = [];
    this.listAsignaciones = [];
    this.listaUsuario = [];

  }

  ngOnInit() {
  	this.verUsuarios();
    this.verHardware();
    this.verSoftware();
    this.FromInit();
    
  }


  verUsuarios(){
    this.usuarioSev.verUsuarios().subscribe( index => {
    	this.listaUsuario = index;
      console.log(index);
    });
  }

  verHardware(){
    this.hard.verHardware().subscribe( y => {
      this.listaHardware = y;
      console.log(y);
    });
  }

  verSoftware(){
      this.soft.verSofware().subscribe( x => {
      this.listaSoftware = x;
      console.log(x);
    });
  }

  FromInit(){
    this.UsuarioFrom = new FormGroup/*this.fb.group*/({
      Id: new FormControl(''),
      Name: new FormControl('')
      
    });
  }

  Limpiar(){
    this.AssignmentFrom.reset({
      UserID: '',
      HardwareID: '',
      SoftwareID: ''
    });
  }

 
  GuardarAsignacion(){
    let postAss = {
      "userID": this.assignment.UserID,
      "softwareID": this.assignment.SoftwareID,
      "hardwareID": this.assignment.HardwareID,
    };
    console.log(postAss);

    this.asig.addAssignment(postAss, "assignment").then(
      result => {
        console.log(result);
        //this.getAssignment();
        //this.showAssignment(id,name);
        this.messageService.add({severity:'success', summary: 'Registro Exitoso', detail:'de la Asignacion'});
        //this.showAssignment(id,name);
      },
      err => {
        console.log(err);
      }
    );

     this.assignment.SoftwareID = null;
      this.assignment.HardwareID = null;
      this.assignment.UserID = null;

  }

 
  ObtenerAsignacion(){
    this.asig.getModel("/users").then(
      result => {
        console.log(result);
        this.listaUsuario = result;
      },
      err => {
        console.log(err);
      }
    );

    this.asig.getModel("/hardware").then(
      result => {
        console.log(result);
        this.listaHardware = result;
      },
      err => {
        console.log(err);
      }
    );

    this.asig.getModel("/software").then(
      result => {
        console.log(result);
        this.listaSoftware = result;
      },
      err => {
        console.log(err);
      }
    );
  }


  showAssignment(id,name) {
    //console.log(this.assignment);
    //this.asig.getModel("assignment/users/" + this.assignment.UserID).then(
    this.asig.getModel("assignment/users/" +id).then(
    //this.asig.getModel("assignment/users/" + id).then(

      result => {
        console.log(result);
        this.listAsignaciones = result;
        //this.changeLabelName(id, name);


        //console.log(this.listaUsuario[id])
        this.user = this.listaUsuario[id];
        //this.assignment.UserID = this.user.id
      },
      err => {
        console.log(err);
        //this.loader.dismiss();
      }
    );


  }


  confirmEliminarAsig(id,hardwareName, softwareName) {
    //console.log(id)
        this.confirmationService.confirm({
            message: 'Desea Eliminar la asignacion de el Hardware '+hardwareName+' y el Software '+softwareName+'?',
            header: 'Eliminar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                this.msgs = [{severity:'info', summary:'Ejecutado', detail:'Has aceptado'}];
                //this.Eliminar(id);
                //this.verUsuarios();
                this.deleteAssignment(id)
                //this.messageService.add({severity:'success', summary: 'Eliminado exitosamente', detail:'el Usuario'});
            },
            reject: () => {
                this.msgs = [{severity:'info', summary:'Rechazado', detail:'Has rechazado'}];
            }
        });
  }

  /*
  deleteAssignment(id) {
    this.assignment.hardwareID = this.listAsignaciones.hardwareID;
    this.assignment.softwareID = this.listAsignaciones.softwareID;
    //console.log(this.assignment);
    let postAss = {
      "userID": this.assignment.UserID,
      "softwareID": this.assignment.SoftwareID,
      "hardwareID": this.assignment.HardwareID,
      
    };
    //this.asig.removeAssignment(postAss, "/assignment/delete").then(
    this.asig.removeAssignment(postAss, "/assignment/delete").then(
      result => {
        console.log(result);
        // this.getAssignment();
        //this.showAssignment();
      },
      err => {
        console.log(err);

        //this.loader.dismiss();
      }
    );
   
   //this.save=true;
  }*/

  deleteAssignment(id){
    //let g = Object.assign({}, this.UsuarioFrom.value);
    //console.log(g);

    this.asig.removeAssignment(id).then( x => {
      console.log(x);
      if (x) { 
        this.messageService.add({severity:'success', summary: 'Eliminado', detail:'el Usuario'});
        this.verUsuarios();
      } else {
        this.messageService.add({severity:'error', summary: 'No se pudo ser eliminar', detail:'Validation failed'});
        //console.log(g);
        this.verUsuarios();
      }
    });
  }


}
