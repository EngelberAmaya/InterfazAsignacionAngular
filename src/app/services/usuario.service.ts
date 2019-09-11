import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
//import { ListadoComponent } from '../components/listado/listado.component';

const httpOptionsDefault = {
    headers: new HttpHeaders({

        // 'accessToken':localStorage.getItem('accessToken'),

        //'Authorization': 'Basic '+btoa('jchiquin:12345'),
        'Content-Type': 'application/json',

    })
};
const url = 'https://localhost:44380/api/';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient) { }

  verUsuarios(){   
    return this.http.get( url + 'users');
  } 

  insertarUser(u){
  	return this.http.post(url + 'users/',u);
  }

  eliminarUser(u, httpOptions = httpOptionsDefault){
  	return new Promise(resolve => {
            this.http.delete(url +'users/' + u, httpOptions).subscribe((data: any) => {
                console.log(data);
                //this.verUsuarios();
               
                resolve(data);
            }, (err: any) => {
                console.log(err);
              

            })
        })
  }
    /*
  editarUser(x, y){
     let zelda = `${url}users/${x}/`;
    return this.http.put( zelda, y )
  }*/
    
  editUser(u, body, httpOptions = httpOptionsDefault){
    //return this.http.put(url + 'users/PutUser/',{params:{'id':u}});
    //return this.http.put(url + 'users/DeleteUser/'+ id);
    return new Promise(resolve => {
            this.http.put(url +'users/' + u, body, httpOptions).subscribe((data: any) => {
                console.log(data);
               this.verUsuarios();
                resolve(data);
            }, (err: any) => {
                console.log(err);
              

            })
        })
  }

}
