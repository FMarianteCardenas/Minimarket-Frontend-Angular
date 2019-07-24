import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GLOBAL} from './global';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  constructor(private _http:HttpClient) { }

  navigateLink(link:any){
    return this._http.get(link).map((data)=>{
      return data;
    })
  }
}
