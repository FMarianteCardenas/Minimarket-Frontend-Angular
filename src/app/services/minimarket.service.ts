import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GLOBAL} from './global';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class MinimarketService {

  constructor(private _http:HttpClient) { }

  obtenerTodos(){
    let url = `${GLOBAL.url}minimarkets?limit=1000`;
    return this._http.get(url).map((data)=>{
      return data;
    });
  }

  obtenerTodosPaginados(){
    let url = `${GLOBAL.url}minimarkets`;
    return this._http.get(url).map((data)=>{
      return data;
    });
  }
}
