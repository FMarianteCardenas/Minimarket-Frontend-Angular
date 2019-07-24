import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaginatorService } from '../../../services/paginator.service';
import { FiltroService } from '../../../services/filtro.service';
import { DatepickerOptions } from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';
import * as moment from 'moment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
@Input() settings:any;
@Input() table_list:any;
@Input() meta:any;
@Input() links:any;

@Output() aplicar_filtro = new EventEmitter<any>();

public url_filtro:string;

/*configuracion ng2-datepicker*/
options: DatepickerOptions = {
  minYear: 1970,
  maxYear: 2050,
  displayFormat: ' D MMMM YYYY',
  barTitleFormat: 'MMMM YYYY',
  dayNamesFormat: 'dd',
  firstCalendarDay: 1, // 0 - Sunday, 1 - Monday
  locale: esLocale,
  //minDate: new Date(Date.now()), // Minimal selectable date
  //maxDate: new Date(Date.now()),  // Maximal selectable date
  barTitleIfEmpty: 'Click para seleccionar una fecha',
  placeholder: 'Seleccionar Fecha', // HTML input placeholder attribute (default: '')
  addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
  addStyle: {}, // Optional, value to pass to [ngStyle] on the input field
  //fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
  useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown
};

public filtro = {
    sortBy:{ },
    valor: { }
  };
  constructor(private _paginatorService:PaginatorService, private _filtroService:FiltroService) {
  }

  ngOnInit() {
    this.setearColumnasEnFiltro();
    this._filtroService.cambiarFiltro("");
    this._filtroService.filterObservable.subscribe((filtro)=>{this.url_filtro = filtro});
  }

  setearColumnasEnFiltro(){
    let columnas = this.settings.columns;
    //console.log("columnas", columnas);
    for(let columna in columnas){
      /*si columnas tiene una propiedad llamada como la columna actual*/
      if (columnas.hasOwnProperty(columna) && columnas[columna]['filter']['visible'] != false) {
        //console.log("columna: ", columna);
        /*de las settings busco el valor del key de la columna actual*/
        let column = this.settings.columns[columna]['key'];
        this.filtro['sortBy'][column]='ASC';
        this.filtro['valor'][column]='';
      }

    }
    console.log("Filtros: ", this.filtro);
  }

  cambiarSortBy(columna:any){
    console.log("columna: ", columna);
    if(this.filtro.sortBy[columna['key']]=='ASC'){
      this.filtro.sortBy[columna['key']] = 'DESC';
    }
    else{
      this.filtro.sortBy[columna['key']] = 'ASC';
    }

    console.log(this.filtro);
  }

  navigate(link:any){
    this._paginatorService.navigateLink(link).subscribe((response:any)=>{
      this.table_list = response.data;
      this.meta = response.meta;
      this.links = response.links;
    })
  }

  aplicarFiltros(){
    let columnas = this.settings.columns;
    console.log("COLUMNAS: ", columnas);

    for(let columna in columnas){
      if(this.settings.columns[columna]['filter']['tipo']==='date' && this.settings.columns[columna]['filter']['visible']== true){
        let fecha = this.filtro.valor[columna];
        let dateString = moment(fecha).format('YYYY-MM-DD');//

        if(dateString!='Invalid date'){
          this.filtro.valor[columna] = dateString;
        }

      }
    }

    let url = this._filtroService.aplicarFiltros(this.filtro,this.settings);
    this._filtroService.cambiarFiltro(url);
    console.log("APLICAR FILTROS: ", this.filtro);
    console.log("FILTRO DE OBSERVABLE: ",this.url_filtro);
    this.aplicar_filtro.emit(this.url_filtro);
  }

  cambiarValorColumna(columna, event, es_fecha=false){
    this.filtro.valor[columna] = event.target.value;
    console.log("Filtro: ", this.filtro);
  }

  cambiarValorSelect(columna,event){
    //console.log("EVENTO: ", event);
    //console.log("Columna: ",columna);
    this.filtro.valor[columna] = event.target.value;
    console.log("Filtro: ", this.filtro);
  }

  buscarValorSelect(columna,event){
    let options = this.settings.columns[columna].filter.data;
    let searched = event.target.value;
    let selected = options.filter(option => option.display === searched);
    //console.log(options);
    //console.log("seleccionado",selected[0].id);
    //console.log(columna);
    //console.log(event);
    this.filtro.valor[columna] = selected[0].id;
  }

  getValue(item, path){
    // console.log("item: ",item);
    // console.log("path:", path);
    if(path == 'id'){
      return (item.id);
    }
    else{
      return this.descend(item, path);
    }
  }

  /**
 * Recorre el arreglo json para obtener un valor de la clave foranea
 * @param  object objeto desde donde se analiza
 * @param  sub    ruta a recorrer
 * @return        valor deseado.
 */
  descend(object, sub) {
    var handle = object,
    stack = sub.split('.'),
    history = [],
    peek;

    while (handle[stack[0]]) {
      if (peek) {
        history.push(peek);
      }
      peek = stack.shift();
      handle = handle[peek];
    }

    if (stack.length > 0) {
      history.push(peek);
      handle = "";
      console.log("Error, ruta erronea, no se puede llegar a '" + stack.join('.') + "' desde '" + history.join('.') + "'.");
    }

    return handle;
  }

}
