import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProdutserviceService } from '../service/produtservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
productForm!:FormGroup;
color=['red','green','yellow','pink','black']
currentProduct:any;
constructor(private pdt:ProdutserviceService,
  private fb:FormBuilder,private router:Router
){}

ngOnInit(): void {
  this.productForm=this.fb.group({
    name:['',Validators.required],
    desc:[''],
    price:['',Validators.required],
    colore:this.fb.array([])
  });

  console.log('pro',this.pdt.currentProduct)
  console.log('color',this.pdt.currentProduct.colore)
 this.currentProduct = this.pdt.currentProduct as {colore :string[]};
 console.log('color',this.pdt.currentProduct.colore)
  if(this.currentProduct){
    this.productForm.patchValue({
      name:this.currentProduct.name,
      desc:this.currentProduct.desc,
      price:this.currentProduct.price,
    })
    
      const colourFormArray = this.productForm.get('colore') as FormArray;
      this.currentProduct.colore.forEach((color: any) => {
        colourFormArray.push(new FormControl(color)); // Manually push new form controls into the form array
      });
    
  }
  
  console.log('kl',this.productForm.value)
}
onSubmit(product2:{name:string,desc:string,price:number,color:[]}){
  console.log(this.pdt.currentProduct.color)
  this.pdt.updateProduct(this.pdt.currentProductId,product2).subscribe(()=>{
    this.router.navigate(['/home'])
  })
  
}
changeColor(c:any){
  let clr = this.productForm.get('colore') as FormArray
  if(c.target.checked){
    clr.push(new FormControl(c.target.value))
  }
  else{
   let i=0;
   clr.controls.forEach((l:any)=>{
    if(l.value==c.target.value){
      clr.removeAt(i)
      return
    }
    i++
   })

  }
}
}
