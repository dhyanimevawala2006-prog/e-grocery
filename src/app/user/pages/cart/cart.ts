import { ChangeDetectorRef, Component } from '@angular/core';
import { CartService } from '../../../service/cart-service';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone:true,
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
  imports:[NgFor,NgIf]
})
export class Cart {

  cartItems:any[] = [];
  total:number = 0;

  userId = sessionStorage.getItem('id');

  imageUrl="http://localhost:3000/upload/";

  constructor(
    private cartService:CartService,
    private cdr:ChangeDetectorRef,
    private router:Router
  ){}

  ngOnInit(){
    this.loadCart();
  }

  loadCart(){

    this.cartService.getCart(this.userId).subscribe((res:any)=>{

      if(res.data){
        this.cartItems = res.data.items;
      }

      this.calculateTotal();
      this.cdr.detectChanges();

    });

  }

  increase(productId:any){
    this.cartService.increaseQty(this.userId,productId).subscribe(()=>{
      this.loadCart();
    });
  }

  decrease(productId:any){
    this.cartService.decreaseQty(this.userId,productId).subscribe(()=>{
      this.loadCart();
    });
  }

  remove(productId:any){
    this.cartService.removeItem(this.userId,productId).subscribe(()=>{
      this.loadCart();
    });
  }

  calculateTotal(){

    this.total = 0;

    this.cartItems.forEach((item:any)=>{
      this.total += item.productId.price * item.quantity;
    });

  }

  // CHECKOUT FUNCTION
  checkout(){

    if(this.cartItems.length === 0){
      alert("Your cart is empty");
      return;
    }

    this.router.navigate(['/checkout'],{
      state:{
        items:this.cartItems,
        total:this.total
      }
    });

  }

}