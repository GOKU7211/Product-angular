import { Component, OnInit } from '@angular/core';
import { ProdutserviceService } from '../service/produtservice.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  productForm!: FormGroup;
  color=['red','green','yellow','pink','black']

  constructor(
    private pdt: ProdutserviceService,
    private router: Router,
    private fb: FormBuilder,
    private toster:ToastrService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      desc: [''],
      price: [0, Validators.required],
      colore:this.fb.array([])
    });
  }

  createProductTask(product: { name: string, desc: string, price: number,color:[] }) {
    this.pdt.createProduct(product).subscribe((res)=>{
      if(this.productForm.valid){
        this.showSuccess();
      }
      this.router.navigate(['/home']);
    })
    
  }
showSuccess(){
  this.toster.success('submitted successfully')
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

