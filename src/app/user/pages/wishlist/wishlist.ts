import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { WishlistService } from '../../../service/wishlistService';
import { NgFor, NgIf } from '@angular/common';
import { CartService } from '../../../service/cart-service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist implements OnInit {
  wishlist: any[] | null = null;

  constructor(
    private wish: WishlistService,
    private cart: CartService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const userId = localStorage.getItem('id');

    if (!userId) {
      this.wishlist = [];
      return;
    }

    this.loadWishlist(userId);
  }

  loadWishlist(userId: any) {
    this.wish.getWishlist(userId).subscribe((res: any) => {
      this.wishlist = res;

      // FORCE UI UPDATE
      this.cdr.detectChanges();
    });
  }

  remove(id: any) {
    this.wish.removeWishlist(id).subscribe(() => {
      const userId = localStorage.getItem('id');

      this.loadWishlist(userId);
    });
  }

  addToCart(product: any) {
    const userId = localStorage.getItem('id');

    const data = {
      userId: userId,
      productId: product.productId,
      quantity: 1,
    };

    this.cart.addToCart(data).subscribe((res: any) => {
      alert(res.message);
    });
  }
}
