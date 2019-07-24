import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {GLOBAL} from './global';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
url:string;
  constructor(private http:HttpClient) {
  }

  public login(prov:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    this.url = GLOBAL.url+`users/login/api`;
    console.log("BODY: ",prov);
    return this.http.post(this.url, prov, httpOptions)
    .map((data) => {
           return data;//console.log("Response:",data);
      },(error) => {
        console.log(error);
      }
    );
  }

  public logout(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("token_type");
    localStorage.removeItem("user");
    localStorage.removeItem("minimarket");
    localStorage.removeItem("name_minimarket");
  }

  public isLogued(){
    let access_token = localStorage.getItem('access_token');
    if(access_token){
      return true;
    }
    else{
      return false;
    }
  }

  public loginBody(email:string,password:string){
    let body = `{"email":"${email}","password":"${password}"}`;
    return body;
  }

  public setSession(token_data:any){
    localStorage.setItem('access_token', token_data.access_token);
    localStorage.setItem('expires_at', token_data.expires_at);
    localStorage.setItem('token_type',token_data.token_type);
    localStorage.setItem('user',JSON.stringify(token_data.user));
    localStorage.setItem('minimarket',JSON.stringify(token_data.minimarket));
    localStorage.setItem('name_minimarket',token_data.minimarket.name);
  }
}
