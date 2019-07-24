import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GLOBAL} from './global';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private _http:HttpClient) {
  }

  obtenerVentas(){
    let url = `${GLOBAL.url}users`;
    return this._http.get(url).map(data=>{
      return data;
    })
  }
}
