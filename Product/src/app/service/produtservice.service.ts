import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/productModel.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutserviceService {
  currentProduct:any;
  currentProductView:any;
  currentProductId:any;
url='https://productpro-9f0c5-default-rtdb.firebaseio.com/products.json'
  constructor(private http:HttpClient) { }

getProducts(){
  return this.http.get<{[key:string]: Product}>(this.url).pipe(map((response)=>{
    let produts =[];
    for(let key in response){
      if(response.hasOwnProperty(key)){
        produts.push({...response[key],id:key})
      }
    }
    return produts
  }))
};
getProductById(id:string){}; 

createProduct(product:any){
return this.http.post(this.url,product)
} ;
updateProduct(id:string, product:Product){
  return this.http.put('https://productpro-9f0c5-default-rtdb.firebaseio.com/products/'+id+'.json',product)
};
deleteProduct(id:string | undefined){
  return this.http.delete('https://productpro-9f0c5-default-rtdb.firebaseio.com/products/'+id+'.json')
};
}
