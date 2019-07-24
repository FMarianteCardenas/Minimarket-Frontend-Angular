import { Component, OnInit } from '@angular/core';
import {VentasService} from '../../services/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
public settings = {
  columns:{
    name:{
      cabecera:"Nombre",
      tipo:"attributes",
      path:"attributes.name"
    },
    lastname:{
      cabecera:"Apellido",
      tipo:"attributes",
      path:"attributes.lastname"
    },
    minimarket:{
      cabecera:"Minimercado",
      tipo:"relationship",
      path:"relationships.minimarket.data.name"
    }
  }
}

public data_table:any;
  constructor(private _ventasService:VentasService) { }

  ngOnInit() {
    this.obtenerVentas();
  }

  obtenerVentas(){
    this._ventasService.obtenerVentas().subscribe((response:any)=>{
      this.data_table = response.data;
      console.log("VENTAS:",response);
    })
  }

}
