import { Component, OnInit, ViewChild } from '@angular/core';
import {ProductosService} from '../../services/productos.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup,FormControl,Validators } from '@angular/forms';

import {CategoriasService} from '../../services/categorias.service';
import {FiltroService} from '../../services/filtro.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  @ViewChild('errorSwal') private errorSwal: SwalComponent;
  @ViewChild('successSwal') private successSwal: SwalComponent;
  /*opciones sweetalert2*/
  public options = {
    'title':'Transacción Completa',
    'text':'Producto Creado',
    'type':'success',
    'confirmButtonText':'Ok, Entiendo',
    'showCloseButton': true,
    'focusConfirm': true
  };

  public options2 = {
    'title':'Transacción Incompleta',
    'text':'No se ha podido crear el producto',
    'type':'error',
    'confirmButtonText':'Ok, Entiendo',
    'showCloseButton': true,
    'focusConfirm': true
  };
  /*opciones sweetalert2*/

  public table_list:any;
  public meta:any;
  public links:any;
  public categorias:any;
  private formCrear = new FormGroup({
    'code': new FormControl('',Validators.required),
    'name': new FormControl('',Validators.required),
    'description':new FormControl('',Validators.required),
    'category_id':new FormControl('',Validators.required)
  });
  public settings = {
    columns:{
      code:{
        cabecera:"Codigo",
        tipo:"attributes",
        path:"attributes.code",
        key:"code",
        parametro:"texto",
        filter:{tipo:"texto",visible:true}
      },
      name:{
        cabecera:"Producto",
        tipo:"attributes",
        path:"attributes.name",
        key:"name",
        filter:{tipo:"texto",visible:true}
      },
      description:{
        cabecera:"Descripción",
        tipo:"attributes",
        path:"attributes.description",
        key:"none",
        filter:{tipo:'texto',visible:false}
      },
      created_at:{
        cabecera:"Fecha Creación",
        tipo:"date",
        path:"attributes.created_at",
        key:"created_at",
        filter:{tipo:'date',visible:true}
      },
      category_id:{
        cabecera:"Categoria",
        tipo:"relationships",
        path:"relationships.category.data.attributes.name",
        key:"category_id",
        filter:{tipo:'dropdown',visible:true,data:[]}
      }
    }
  }

  constructor(private _productosService:ProductosService,
              private _categoriasService:CategoriasService,
              private modalService:NgbModal,
              private _filtroService:FiltroService) { }

  ngOnInit() {
    this.cargarProductos();
    this.cargarCategorias();
  }

  cargarProductos(){
    this._productosService.obtenerProductos().subscribe((response:any)=>{
      this.table_list = response.data;
      this.meta = response.meta;
      this.links = response.links;
    })
  }

  cargarCategorias(){
    this._categoriasService.obtenerTodas().subscribe((response:any)=>{
      this.categorias = response.data;
      let categorias = this._filtroService.transformArraySelectData(this.categorias);
      this.settings.columns.category_id.filter.data = categorias;
    });
  }

  aplicarFiltro(url:string){
    this._productosService.filtrarProductos(url).subscribe((response:any)=>{
      this.table_list = response.data;
      this.links = response.links;
      this.meta = response.meta;
    })
  }

  crearProducto(){
    let code = this.formCrear.get('code').value;
    let name = this.formCrear.get('name').value;
    let description = this.formCrear.get('description').value;
    let category_id = this.formCrear.get('category_id').value;
    let data = {
      code:code,name:name,description:description,category_id:category_id
    }
    //console.log("DATA: ",data);
    let body = this._productosService.getJsonCrear(data);
    //console.log(body);
    this._productosService.crearProducto(body).subscribe((response:any)=>{
      console.log(response);
      this.successSwal.show();
      this.cargarProductos();
      this.resetearFormulario();
    },(error)=>{
      console.log(error);
      this.errorSwal.show();
    })
  }

  resetearFormulario(){
    this.formCrear.reset();
    this.formCrear.setValue({
      'code':'',
      'name':'',
      'description':'',
      'category_id':''
    });
    this.modalService.dismissAll();
  }

  cerrarAlert(){
    this.errorSwal.close;
    this.resetearFormulario();
  }

  cerrarAlert2(){
    this.successSwal.close;
    this.resetearFormulario();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
