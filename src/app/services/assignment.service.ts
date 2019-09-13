import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';



const httpOptionsDefault = {
    headers: new HttpHeaders({

        'Content-Type': 'application/json',

    })
};
const url = 'https://localhost:44380/api/';


@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
	

  constructor( private http: HttpClient,
               private asi: UsuarioService) { }
  
  
  getModel(tipo: String, httpOptions = httpOptionsDefault) {

        return new Promise(resolve => {
            this.http.get(url + "" + tipo, httpOptions).subscribe(data => {
                resolve(data);
                console.log(data);
                

            }, err => {
                console.log(err);

            })
        })
    }




   addAssignment(model, tipo: String, httpOptions = httpOptionsDefault) {

        return new Promise(resolve => {
            this.http.post(url + "" + tipo, model, httpOptions).subscribe((data: any) => {
                console.log(data);
               // this.showNotification('bottom', 'right', 2, "Datos guardados con exito");

                resolve(data);
            }, (err: any) => {
                console.log(err);
                //this.showNotification('bottom', 'right', 4, err);

            })
        })
    }


    /*
    removeAssignment(id, tipo: String, httpOptions = httpOptionsDefault) {

        return new Promise(resolve => {
            this.http.delete(url + "" + tipo + '/' + id, httpOptions).subscribe((data: any) => {
                console.log(data);
                
                resolve(data);
            }, (err: any) => {
                console.log(err);
                //this.showNotification('bottom', 'right', 4, err);

            })
        })
    }*/



    removeAssignment(u, httpOptions = httpOptionsDefault){
      return new Promise(resolve => {
            this.http.delete(url +'assignment/' + u, httpOptions).subscribe((data: any) => {
                console.log(data);
                //this.verUsuarios();
               
                resolve(data);
            }, (err: any) => {
                console.log(err);
              

            })
        })
  }
   
}
