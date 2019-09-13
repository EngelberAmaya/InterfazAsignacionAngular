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
export class SofwareService {

  constructor(private http: HttpClient) { }


  verSofware(){   
    return this.http.get( url + 'software');
  }

  insertarSofware(u){
  	return this.http.post(url + 'software/',u);
  }


  eliminarSoftware(u, httpOptions = httpOptionsDefault){
    return new Promise(resolve => {
            this.http.delete(url +'software/' + u, httpOptions).subscribe((data: any) => {
                console.log(data);
                
                resolve(data);
            }, (err: any) => {
                console.log(err);
              

            })
        })
  }


  editSoftware(u, body, httpOptions = httpOptionsDefault){
    
    return new Promise(resolve => {
            this.http.put(url +'software/' + u, body, httpOptions).subscribe((data: any) => {
                console.log(data);
               
                resolve(data);
            }, (err: any) => {
                console.log(err);
              

            })
    })
  }
  
}
