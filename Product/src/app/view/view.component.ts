import { Component, OnInit } from '@angular/core';
import { ProdutserviceService } from '../service/produtservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit {

pro1:any;
constructor(public pdt:ProdutserviceService,
  private router:Router
){}
ngOnInit(): void {
  this.pro1=this.pdt.currentProductView
  console.log(this.pdt.currentProductView)
  console.log(this.pro1)
}
back(){
  this.router.navigate(['/home'])
}
}
