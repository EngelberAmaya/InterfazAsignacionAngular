import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import {  MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';




@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ListadoComponent implements OnInit {

	listaUsuario:any;
  msgs: any[] = [];
  UsuarioFrom: FormGroup;
  //let Id = id;
  user:any;


  constructor(private serv: UsuarioService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit() {
  	this.verUsuarios();
    this.FromInit();
    this.user={};
  }


  FromInit(){
    this.UsuarioFrom = new FormGroup/*this.fb.group*/({
      Id: new FormControl(''),
      UserName: new FormControl(''),
      Name: new FormControl(''),
      LastName: new FormControl(''),
      Age: new FormControl(''),
      LastSessionDateTime: new FormControl('')
    });
  }


  verUsuarios(){
    this.serv.verUsuarios().subscribe( z => {
    	this.listaUsuario = z;
      console.log(z);
    });
  }

  confirmEliminar(id, userName, name, lastName, age, lastSessionDateTime) {
    //console.log(id)
        this.confirmationService.confirm({
            message: 'Desea Eliminar a '+name+' '+lastName+'?',
            header: 'Eliminar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                //this.msgs = [{severity:'info', summary:'Ejecutado', detail:'Has aceptado'}];
                this.Eliminar(id);
                this.verUsuarios();
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

    this.serv.eliminarUser(id).then( x => {
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


  EditarUser(id,userName, name, lastName, age, lastSessionDateTime){
    this.UsuarioFrom.setValue({
      "Id": id,
      "UserName": userName,
      "Name": name,
      "LastName": lastName,
      "Age": age,
      "LastSessionDateTime": lastSessionDateTime
    });

  }


  ModificarUser(){
    console.log(this.UsuarioFrom.value);
    
    this.serv.editUser(this.UsuarioFrom.value.Id,this.UsuarioFrom.value).then(x => {
      console.log(x);
      this.verUsuarios()
    });
    this.messageService.add({severity:'success', summary: 'Modificacion Exitosa', detail:'del Usuario'});
  }

}
