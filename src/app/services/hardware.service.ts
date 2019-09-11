import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

const httpOptionsDefault = {
    headers: new HttpHeaders({

        'Content-Type': 'application/json',

    })
};
const url = 'https://localhost:44380/api/';

@Injectable({
  providedIn: 'root'
})
export class HardwareService {

  constructor(private http: HttpClient) { }

  verHardware(){   
    return this.http.get( url + 'hardware');
  }

  insertarHardware(u){
  	return this.http.post(url + 'hardware/',u);
  }

   eliminarHardware(u, httpOptions = httpOptionsDefault){
    return new Promise(resolve => {
            this.http.delete(url +'hardware/' + u, httpOptions).subscribe((data: any) => {
                console.log(data);
                
                resolve(data);
            }, (err: any) => {
                console.log(err);
              

            })
        })
  }


  editHardware(u, body, httpOptions = httpOptionsDefault){
    //return this.http.put(url + 'users/PutUser/',{params:{'id':u}});
    //return this.http.put(url + 'users/DeleteUser/'+ id);
    return new Promise(resolve => {
            this.http.put(url +'hardware/' + u, body, httpOptions).subscribe((data: any) => {
                console.log(data);
               //this.verHardware();
                resolve(data);
            }, (err: any) => {
                console.log(err);
              

            })
        })
  }
  
}
