import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GLOBAL} from './global';
import 'rxjs/add/operator/map';

import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private _http:HttpClient) { }

  obtenerProductos(){
    let url = `${GLOBAL.url}products?sort_by=--id`;
    return this._http.get(url).map((data)=>{
      return data;
    });
  }

  filtrarProductos(filtro:string){
    let url = `${GLOBAL.url}products${filtro}`;
    return this._http.get(url).map((data)=>{
      return data;
    });
  }

  public crearProducto(body:any){
    let url = `${GLOBAL.url}products`;
    return this._http.post(url,body).map((data)=>{
      return data;
    });
  }

  public buscarProductoCodigo(minimarket_id,product_code){
    let url = `${GLOBAL.url}minimarkets/${minimarket_id}/product/${product_code}`;
    return this._http.get(url).map((data)=>{
      return data;
    });
  }

  getJsonCrear(data:any){
    let producto = new Product(-1,data.code,data.name,data.description,data.category_id);
    return producto.getJsonCrear();
  }

}
