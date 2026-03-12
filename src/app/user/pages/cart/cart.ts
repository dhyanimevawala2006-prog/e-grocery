import { ChangeDetectorRef, Component } from '@angular/core';
import { CartService } from '../../../service/cart-service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
  imports: [NgFor, NgIf, FormsModule],
})
export class Cart {
  cartItems: any[] = [];
  total: number = 0;

  userId = sessionStorage.getItem('id');

  imageUrl = 'http://localhost:3000/upload/';

  couponCode: string = '';
  discount: number = 0;
  finalTotal: number = 0;

  constructor(
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart(this.userId).subscribe((res: any) => {
      if (res.data) {
        this.cartItems = res.data.items;
      }

      this.calculateTotal();
      this.cdr.detectChanges();
    });
  }

  increase(productId: any) {
    this.cartService.increaseQty(this.userId, productId).subscribe(() => {
      this.loadCart();
    });
  }

  decrease(productId: any) {
    this.cartService.decreaseQty(this.userId, productId).subscribe(() => {
      this.loadCart();
    });
  }

  remove(productId: any) {
    this.cartService.removeItem(this.userId, productId).subscribe(() => {
      this.loadCart();
    });
  }

  calculateTotal() {
    this.total = 0;

    this.cartItems.forEach((item: any) => {
      this.total += item.productId.price * item.quantity;
    });
  }

  // APPLY COUPON
  // APPLY COUPON
  applyCoupon() {
    const code = this.couponCode.trim().toUpperCase();

    if (!code) {
      alert('Enter Coupon Code');
      return;
    }

    /* reset old coupon before applying new one */
    this.discount = 0;
    this.finalTotal = 0;

    const data = {
      code: code,
      userId: this.userId,
      cartTotal: this.total,
    };

    this.http.post('http://localhost:3000/api/coupon/apply', data).subscribe({
      next: (res: any) => {
        this.discount = res.discount;
        this.finalTotal = res.finalTotal;

        /* force UI refresh */
        this.cdr.detectChanges();
      },

      error: () => {
        alert('Invalid Coupon');
      },
    });
  }

  // CHECKOUT FUNCTION
  checkout() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    this.router.navigate(['/checkout'], {
      state: {
        items: this.cartItems,
        total: this.total,
        discount: this.discount,
        couponCode: this.couponCode,
      },
    });
  }
}
