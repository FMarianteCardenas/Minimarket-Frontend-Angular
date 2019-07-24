import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GLOBAL} from './global';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private _http:HttpClient) { }

  obtenerUsuarios(){
    let url = `${GLOBAL.url}users`;
    return this._http.get(url).map((data)=>{
      return data;
    });
  }

  filtrarUsuarios(filtro:string){
    let url = `${GLOBAL.url}users${filtro}`;
    return this._http.get(url).map((data)=>{
      return data;
    });
  }
}
