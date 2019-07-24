import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {
private filterSubject = new Subject<string>();
public filterObservable = this.filterSubject.asObservable();
public filtros:any;
  constructor() { }

  /*cambiando el valor del filtro*/
  cambiarFiltro(filtro_nuevo:string){
    this.filterSubject.next(filtro_nuevo);
  }

  aplicarFiltros(filtros:any, settings:any){
    let url = '?sort_by=';
    console.log("FILTROS RECIBIDOS", filtros);
    console.log("COLUMNAS RECIBIDAS", settings.columns);
    /*agregando el ordenamiento ascendente o descendente de las columnas*/
    for(let columna in filtros['sortBy']){
      console.log("columna sort_by:",columna);
      if(settings['columns'][columna]['filter']['tipo']=='texto'){
        if(filtros['sortBy'][columna]==='ASC'){
          url+=`++${columna}`;
        }
        else if(filtros['sortBy'][columna]==='DESC'){
          url+=`--${columna}`;
        }
      }
      else if(settings['columns'][columna]['filter']['tipo']=='date'){
        if(filtros['sortBy'][columna]==='ASC'){
          url+=`+${columna}`;
        }
        else if(filtros['sortBy'][columna]==='DESC'){
          url+=`-${columna}`;
        }
      }
      else if(settings['columns'][columna]['filter']['tipo']=='dropdown'){
        if(filtros['sortBy'][columna]==='ASC'){
          url+=`+${columna}`;
        }
        else if(filtros['sortBy'][columna]==='DESC'){
          url+=`-${columna}`;
        }
      }
      url+=`,`;
    }
   /*quitando la ultima coma de los sort*/
    url = url.slice(0,-1);

    /*agregando los valores ingresados por cada columna*/
    for(let columna in filtros['valor']){
      if(settings['columns'][columna]['filter']['tipo']=='texto'){

          if(filtros['valor'][columna]!=''){
            url+=`&${columna}=><${filtros['valor'][columna]}`;
          }

      }
      else if(settings['columns'][columna]['filter']['tipo']=='date'){
          if(filtros['valor'][columna]!=''){
            url+=`&${columna}=><${filtros['valor'][columna]}`;
          }
      }
      else if(settings['columns'][columna]['filter']['tipo']=='dropdown'){
        console.log("ENTRO");
        if(filtros['valor'][columna]!=''){
          url+=`&${columna}=${filtros['valor'][columna]}`;
        }
      }
    }



    console.log("URL FILTRO: ",url);
    return url;
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
