import { ChangeDetectorRef, Component } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { OrderService } from '../../../service/order-service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.html',
  styleUrls: ['./myorder.css'],
  imports:[NgFor,NgIf,DatePipe]
})
export class Myorder {

  orders:any[]=[];
  userId=sessionStorage.getItem('id');

  imageUrl="http://localhost:3000/uploads/";

  constructor(private orderService:OrderService,private cdr:ChangeDetectorRef){}

  ngOnInit(){
    this.getOrders();
  }

  getOrders(){
    this.orderService.getUserOrders(this.userId).subscribe({
      next:(res:any)=>{
        this.orders = res.data;
        this.cdr.detectChanges();
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

}