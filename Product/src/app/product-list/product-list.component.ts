import { Component, OnInit } from '@angular/core';
import { Product } from '../model/productModel.model';
import { ProdutserviceService } from '../service/produtservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
productData:Product[]=[];
constructor(private pdt:ProdutserviceService,
  private router:Router
){}

ngOnInit(): void {
  this.pdt.getProducts().subscribe((res)=>{
    this.productData=res;
    console.log(this.productData)
  })
}
onEditclick(id:string |undefined){
  let currentPro= this.productData.find((pt)=>{return pt.id === id})
  this.pdt.currentProduct=currentPro;
  this.pdt.currentProductId=id;
  this.router.navigate(['/edit',id])
}
onDelete(id:string |undefined){
  if(confirm('are you sure')){
    this.pdt.deleteProduct(id).subscribe(()=>{
      this.pdt.getProducts().subscribe((res)=>{
        this.productData=res;
      })
      this.router.navigate(['/home'])
    })
  } 
}
onViewClick(id:string | undefined){
  let currentview=this.productData.find((pv)=>{return pv.id === id})
  this.pdt.currentProductView=currentview
  this.router.navigate(['/view'])
}

}
