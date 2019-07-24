import { Injectable } from '@angular/core';
import {HttpEvent,HttpInterceptor,HttpHandler,HttpRequest,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class AuthtokeninterceptorService implements HttpInterceptor {

  constructor() { }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const token = localStorage.getItem('access_token');
  //
  //   req = req.clone({
  //     setHeaders: {
  //       'Authorization': `Bearer ${token}`
  //     },
  //   });
  //
  //   return next.handle(req);
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cloned = req.clone({
      headers: this.addExtraHeaders(req.headers)
    });
    return next.handle(cloned);
  }

  private addExtraHeaders(headers: HttpHeaders): HttpHeaders{
    const access_token = localStorage.getItem("access_token");
    if(!headers.has('Content-Type')){
      headers = headers.append('Content-Type', 'application/json');
    }
    if (access_token) {
      headers = headers.append('Authorization', "Bearer " + access_token);
    }

    return headers;
  }
}
