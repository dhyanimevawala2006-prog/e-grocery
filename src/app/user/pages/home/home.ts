import { NgClass, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ProductService } from '../../../service/product-service';
import { CartService } from '../../../service/cart-service';
import { WishlistService } from '../../../service/wishlistService';
import { Router } from '@angular/router';
import { ToastService } from '../../../service/toast-service';
import { ChatbotComponent } from "../../../chatbot/chatbot";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgClass, ChatbotComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  products: any[] = [];
  user_id: any = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private pservice: ProductService,
    private cartService: CartService,
    private wish: WishlistService,
    private router: Router,
    private toast: ToastService,
  ) {}

  ngOnInit() {
    this.loadProduct();
    this.user_id = localStorage.getItem('id');
  }

  loadProduct() {
    this.pservice.get().subscribe({
      next: (res: any) => {
        this.products = res.data;
        this.cdr.detectChanges();
      },

      error: () => console.log('something went wrong'),
    });
  }

  addToCart(pid: any) {
    if (!this.user_id) {
      this.toast.show('Please login first');
      this.router.navigate(['/login']);
      return;
    }

    const addCart = {
      userId: this.user_id,
      productId: pid,
      quantity: 1,
    };

    this.cartService.addToCart(addCart).subscribe({
      next: (res: any) => {
        this.toast.show('Added to Cart 🛒');
      },

      error: () => console.log('error adding cart'),
    });
  }

  addToWishlist(product: any) {
    if (!this.user_id) {
      this.toast.show('Please login first');
      this.router.navigate(['/login']);
      return;
    }

    const data = {
      userId: this.user_id,
      productId: product._id,
      pname: product.pname,
      description: product.description,
      price: product.price,
      pic: product.pic,
    };

    this.wish.addWishlist(data).subscribe((res: any) => {
      this.toast.show('Added to Wishlist ❤️');

      // update wishlist count in header
      this.wish.getWishlist(this.user_id).subscribe((items: any) => {
        this.wish.setWishlistCount(items.length);
      });
    });
  }


}
