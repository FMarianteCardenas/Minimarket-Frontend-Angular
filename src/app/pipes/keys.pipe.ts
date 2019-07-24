import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   return null;
  // }
  // El parametro object representa, los valores de las propiedades o indice (transforma un json en un array para recorrer con for)
  transform(objects : any = []) {
    return Object.values(objects);
  }

  /**
   * [transform description]
   * @param  value [description]
   * @param  args  [description]
   * @return       [description]
   */
  // transform(value, args:string[]) : any {
  //   let keys = [];
  //   for (let key in value) {
  //     keys.push({key: key, value: value[key]});
  //   }
  //   return keys;
  // }

}
