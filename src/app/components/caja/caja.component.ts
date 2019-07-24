import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.css']
})
export class CajaComponent implements OnInit {
public formCodigo:FormGroup;
public formPago:FormGroup;
public productos_venta:any[];
public total_venta:number;
public vuelto:number;
  constructor(private _productosService:ProductosService) { }

  ngOnInit() {
    this.formCodigo = new FormGroup({
      'codigo':new FormControl('',Validators.required)
    });
    this.formPago = new FormGroup({
      'pago':new FormControl('',Validators.required)
    });
    this.productos_venta = [];
    this.total_venta = 0;
    this.vuelto = 0;
  }

  actualizarCantidad(producto,event){
    console.log(producto);
    console.log(event);
  }

  buscarProducto(){
    let codigo = this.formCodigo.get('codigo').value;
    this.borrarFormularioCodigoIngresoTabla();
    let minimarket = JSON.parse(localStorage.getItem('minimarket'));
    this._productosService.buscarProductoCodigo(minimarket.id,codigo).subscribe((response:any)=>{
      console.log(response);
      let producto = this.productos_venta.filter(item=>item.codigo===response.attributes.code);
      if(producto.length === 0){
        /*el producto no esta en la lista*/
        this.productos_venta.push({
          codigo:response.attributes.code,
          producto:response.attributes.name,
          precio:response.attributes.sale_price,
          cantidad:1
        });
        this.actualizarTotalVenta();
      }
      else{
        /*el producto ya esta en la lista, se aumenta la cantidad*/
        producto[0].cantidad+=1;
        this.actualizarTotalVenta();
      }
      console.log("prod: ",producto);

    },(error)=>{

    });
    console.log(codigo,minimarket.id);
  }

  actualizarTotalVenta(){
    let total = 0;
    for(let producto of this.productos_venta){
      let subtotal = producto.precio * producto.cantidad;
      total+=subtotal;
    }
    this.total_venta = total;
    this.calcularVuelto();
  }

  calcularVuelto(){
    let dinero_pago = this.formPago.get('pago').value;
    let result;
    if(dinero_pago){
      result = dinero_pago - this.total_venta;
      if(result>=0){
        this.vuelto = result;
      }
      else{
        this.vuelto = 0;
      }
    }
  }

  borrarFormularioCodigoIngresoTabla(){
    this.formCodigo.reset();
    this.formCodigo.setValue({
      'codigo':''
    });
  }

}
