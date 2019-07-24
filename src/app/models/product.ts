export class Product {
id?:number;
code:string;
name:string;
description:string;
category_id:number;

constructor(id:number,code:string,name:string,description:string,category_id:number){
  this.id = id;
  this.code = code;
  this.name = name;
  this.description = description;
  this.category_id = category_id;
}

getJsonCrear(){
  return `{
    "data":{
              "type":"product",
              "id":"${this.id}",
              "attributes":{
                "code":"${this.code}",
                "name":"${this.name}",
                "description":"${this.description}",
                "category_id":"${this.category_id}"
              }
    }
  }`
}


}
