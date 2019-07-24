import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {MENUS} from '../../services/global';
import * as $ from 'jquery';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
public menus:any;
public user:any;
public token:any;
public minimarket:any;
public toggle:string;
  constructor(private _router:Router, private _auth:AuthService) {


  }

  ngOnInit() {
    this.menus = MENUS;
    this.token = localStorage.getItem('access_token');
    this.user = JSON.parse(localStorage.getItem('user'));
    this.minimarket = JSON.parse(localStorage.getItem('minimarket'));
    this.toggle = 'Ocultar Menú';
    // let isLogued = this._auth.isLogued();
    // if(isLogued){
    //   console.log("SI LOGUEADO");
    // }
    // else{
    //   console.log("NO LOGUEADO");
    //   this._router.navigate(['login']);
    // }
    // $("#menu-toggle").click((e)=>{
    //   e.preventDefault();
    //   console.log("SI");
    //   if(this.toggle === 'Ocultar Menú'){
    //     this.toggle = 'Mostrar Menú';
    //   }
    //   else{
    //     this.toggle = 'Ocultar Menú';
    //   }
    //   $("#wrapper").toggleClass("toggled");
    // });
  }

  cargarMenu(menu:any){
    this._router.navigate([menu.path]);
  }

  cerrarSesion(){
    this._auth.logout();
    this._router.navigate(['login']);
  }

  isLogued(){
    return this._auth.isLogued();
  }

  ocultarMenu(){
    $("#wrapper").toggleClass("toggled");
  }

}
