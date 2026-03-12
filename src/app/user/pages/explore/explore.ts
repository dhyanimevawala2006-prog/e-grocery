import { ChangeDetectorRef, Component } from '@angular/core';
import { CartService } from '../../../service/cart-service';
import { NgFor } from '@angular/common';
import { ProductService } from '../../../service/product-service';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../../search-pipe-pipe';


@Component({
  selector: 'app-explore',
  imports: [NgFor,FormsModule,SearchPipe],
  templateUrl: './explore.html',
  styleUrl: './explore.css',
})
export class Explore {
  explore : any[] = []
 products: any[] = []
  user_id: any = ""
  searchText:string='';
  constructor(private cdr: ChangeDetectorRef, private pservice: ProductService, private cartService: CartService) { }
  loadProduct() {
    this.pservice.get().subscribe({
      next: (res: any) => {
        this.products = res.data,
          this.cdr.detectChanges()
      }, error: (err: any) => console.log("something went wrong")
    })
  }
  ngOnInit() {
    this.loadProduct();
    this.user_id = sessionStorage.getItem("id");
  }

  addToCart(pid: any) {
    if (!this.user_id) {
      window.location.href = "/login"
      alert('Please login first')

    } else {
      const addCart = {
        userId: this.user_id,
        productId: pid,
        quantity: 1,
      };
      this.cartService.addToCart(addCart).subscribe({
        next: (res: any) => {alert(res.message)},
        error: (err: any) => console.log("err")
      })


    }
  }
}