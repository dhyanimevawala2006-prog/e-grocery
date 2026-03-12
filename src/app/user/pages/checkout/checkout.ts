import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import Swal from 'sweetalert2';
import { CartService } from '../../../service/cart-service';
import { OrderService } from '../../../service/order-service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.html',
  imports: [NgFor, FormsModule],
  styleUrls: ['./checkout.css'],
})
export class Checkout {
  cartItems: any[] = [];
  total: number = 0;

  // coupon variables
  discount: number = 0;
  couponCode: string = '';

  name: string = '';
  phone: string = '';
  address: string = '';
  city: string = '';

  userId = sessionStorage.getItem('id');

  imageUrl = 'http://localhost:3000/upload/';

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadCart();

    // GET COUPON DATA FROM CART PAGE
    const state: any = history.state;

    if (state) {
      this.discount = state.discount || 0;
      this.couponCode = state.couponCode || '';
    }
  }

  // LOAD CART
  loadCart() {
    this.cartService.getCart(this.userId).subscribe((res: any) => {
      this.cartItems = res.data.items;

      this.calculateTotal();

      this.cdr.detectChanges();
    });
  }

  // CALCULATE TOTAL
  calculateTotal() {
    this.total = 0;

    this.cartItems.forEach((item: any) => {
      this.total += item.productId.price * item.quantity;
    });
  }

  // PLACE ORDER
  placeOrder() {
    if (!this.name || !this.phone || !this.address || !this.city) {
      Swal.fire({
        icon: 'warning',
        title: 'Please fill all fields',
      });

      return;
    }

    const items = this.cartItems.map((item: any) => ({
      productId: item.productId._id,
      quantity: item.quantity,
    }));

    const orderData = {
      userId: this.userId,

      items: items,

      total: this.total + 40,

      discount: this.discount,

      couponCode: this.couponCode,

      address: {
        name: this.name,
        phone: this.phone,
        address: this.address,
        city: this.city,
      },
    };

    this.orderService.createOrder(orderData).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Order Placed!',
          text: 'Your food is on the way 🍔',
          confirmButtonColor: '#ff6b00',
        }).then(() => {
          this.cartItems = [];
          this.total = 0;

          window.location.href = '/';
        });
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
