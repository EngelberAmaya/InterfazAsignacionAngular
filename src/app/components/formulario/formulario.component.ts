import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import {  MessageService } from 'primeng/api';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  providers: [MessageService]
  
})
export class FormularioComponent implements OnInit {

	//listUsuario:any;

	UsuarioFrom: FormGroup;

	msgs: any[] = [];
	

  constructor( private serv: UsuarioService,
  				/*private fb: FormBuilder,*/ 
  				private messageService: MessageService) { }

  ngOnInit() {
    this.FromInit();
  }

  FromInit(){
  	this.UsuarioFrom = new FormGroup/*this.fb.group*/({
  		UserName: new FormControl(''),
  		Name: new FormControl(''),
  		LastName: new FormControl(''),
  		Age: new FormControl(''),
  		LastSessionDateTime: new FormControl('')
  	});
  }

  Limpiar(){
  	this.UsuarioFrom.reset({
  		UserName: '',
  		Name: '',
  		LastName: '',
  		Age: '',
  		LastSessionDateTime: '',
  	});
  }


  Guardar(){
  	
  	let g = Object.assign({}, this.UsuarioFrom.value);
  	console.log(g);
  	
  	this.serv.insertarUser(g).subscribe( x => {
  		console.log(x);
  		if (x) { 
  			this.messageService.add({severity:'success', summary: 'Registro Exitoso', detail:'del Usuario'});
  		} else {
  			this.messageService.add({severity:'error', summary: 'Registro Exitoso', detail:'Validation failed'});
  			//console.log(g);
  		}
  	});
  	
  	this.Limpiar();
  }



  


/*
  save(){
  	let usuario: IUsuario = Object.assign({}, this.UsuarioFrom.value);
  	console.table(usuario);
  }*/
/*
  saveUsuario(){
  	let usuario = Object.assign({}, this.UsuarioFrom.value);
  	console.table(usuario);
  }
*/
}
