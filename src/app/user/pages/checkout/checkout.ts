import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import Swal from 'sweetalert2';
import { CartService } from '../../../service/cart-service';
import { OrderService } from '../../../service/order-service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.html',
  imports:[NgFor,FormsModule],
  styleUrls: ['./checkout.css']
})

export class Checkout {

  cartItems:any[]=[];
  total:number = 0;

  name:string="";
  phone:string="";
  address:string="";
  city:string="";

  userId=sessionStorage.getItem('id');

  imageUrl="http://localhost:3000/upload/";

  constructor(
    private cartService:CartService,
    private orderService:OrderService,
    private cdr:ChangeDetectorRef
  ){}

  ngOnInit(){
    this.loadCart();
  }

  // LOAD CART
  loadCart(){
    this.cartService.getCart(this.userId).subscribe((res:any)=>{
      this.cartItems = res.data.items;
      // alert(this.cartItems);
      this.calculateTotal();
      this.cdr.detectChanges();
    });
  }

  // CALCULATE TOTAL
  calculateTotal(){
    this.total = 0;

    this.cartItems.forEach((item:any)=>{
      this.total += item.productId.price * item.quantity;
    });
  }

  // PLACE ORDER
 placeOrder(){

  if(!this.name || !this.phone || !this.address || !this.city){
    Swal.fire({
      icon:'warning',
      title:'Please fill all fields'
    });
    return;
  }

  const items = this.cartItems.map((item:any)=>({
    productId:item.productId._id,
    quantity:item.quantity
  }));

  const orderData = {
    userId:this.userId,
    items:items,
    total:this.total + 40,
    address:{
      name:this.name,
      phone:this.phone,
      address:this.address,
      city:this.city
    }
  };

  this.orderService.createOrder(orderData).subscribe({

    next:(res:any)=>{

      Swal.fire({
        icon:'success',
        title:'Order Placed!',
        text:'Your food is on the way 🍔',
        confirmButtonColor:'#ff6b00'
      }).then(()=>{
        
        // CLEAR CART
        this.cartItems=[];
        this.total=0;

        // REDIRECT TO HOME
       window.location.href='/';

      });

    },

    error:(err)=>{
      console.log(err);
    }

  });

}

}