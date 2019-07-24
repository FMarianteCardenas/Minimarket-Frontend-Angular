import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GLOBAL} from './global';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private _http:HttpClient) { }

  obtenerTodas(){
    let url = `${GLOBAL.url}categories?limit=1000`;
    return this._http.get(url).map((data)=>{
      return data;
    });
  }
}
