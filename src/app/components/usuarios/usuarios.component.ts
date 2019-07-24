import { Component, OnInit } from '@angular/core';
import {UsuariosService} from '../../services/usuarios.service';
import {MinimarketService} from '../../services/minimarket.service';
import {FiltroService} from '../../services/filtro.service';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
public table_list:any;
public meta:any;
public links:any;
public minimarkets:any;
public settings = {
  columns:{
    name:{
      cabecera:"Nombre",
      tipo:"attributes",
      path:"attributes.name",
      key:"name",
      parametro:"texto",
      filter:{tipo:"texto",visible:true}
    },
    lastname:{
      cabecera:"Apellido",
      tipo:"attributes",
      path:"attributes.lastname",
      key:"lastname",
      parametro:"texto",
      filter:{tipo:"texto",visible:true}
    },
    minimarket_id:{
      cabecera:"Minimercado",
      tipo:"relationships",
      path:"relationships.minimarket.data.name",
      key:"minimarket_id",
      filter:{tipo:'dropdown',visible:true,data:[]}
    },
    created_at:{
      cabecera:"Fecha Creación",
      tipo:"date",
      path:"attributes.created_at",
      key:"created_at",
      filter:{tipo:'date',visible:true}
    },
    fecha_minimarket:{
      cabecera:"Fecha Creación minimercado",
      tipo:"date",
      path:"relationships.minimarket.data.created_at",
      filter:{tipo:'date',visible:false}
    }
  }
}
  constructor(private _usuariosService:UsuariosService, private _minimarketService:MinimarketService, private _filtroService:FiltroService) {
  }

  ngOnInit() {
     this.cargarMinimercados();
     this.obtenerUsuarios();
  }

  aplicarFiltro(url:string){
    this._usuariosService.filtrarUsuarios(url).subscribe((response:any)=>{
      this.table_list = response.data;
      this.links = response.links;
      this.meta = response.meta;
    })
  }

  obtenerUsuarios(){
    this._usuariosService.obtenerUsuarios().subscribe((response:any)=>{
      this.table_list = response.data;
      this.links = response.links;
      this.meta = response.meta;
    })
  }

  cargarMinimercados(){
    this._minimarketService.obtenerTodos().subscribe((response:any)=>{
      this.minimarkets = response.data;
      this.settings.columns.minimarket_id.filter.data = this._filtroService.transformArraySelectData(this.minimarkets);
      console.log("minimercados: ",this.minimarkets);
    });
  }

  transformArraySelectData(data){
    //let data = JSON.parse(this.minimarkets);
    let array = [];
    for(let item in data){
      array.push({id:data[item].id,display:data[item].attributes.name});
    }
    //console.log("minimercados Select: ", array);
    return array;
  }

}
