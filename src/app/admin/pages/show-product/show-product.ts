import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { ProductService } from '../../../service/product-service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../search-pipe-pipe';

@Component({
  selector: 'app-show-product',
  standalone: true,
  imports: [NgFor,CommonModule,RouterModule,FormsModule,SearchPipe],
  templateUrl: './show-product.html',
  styleUrl: './show-product.css',
})
export class ShowProduct {
  products:any[]=[]

  showproduct:any[]=[]
   searchText:string=''
  constructor(private cdr:ChangeDetectorRef,private pservice:ProductService,private router: Router,){}
  loadProduct(){
    this.pservice.get().subscribe({
      next:(res:any)=>{
        this.products=res.data,
        this.cdr.detectChanges()
      },error:(err:any)=>console.log("something went wrong")
    })
  }
  ngOnInit(){
    this.loadProduct();
  }

 deleteProduct(id: any) {
  this.pservice.deleteProduct(id).subscribe({
    next: () => {
      alert("Product Deleted");
      this.cdr.detectChanges();
      this.loadProduct();
    },
    error: (err) => {
      console.log(err);
    }
  });
}
}
