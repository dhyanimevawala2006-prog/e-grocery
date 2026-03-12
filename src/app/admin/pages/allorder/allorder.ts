import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../service/order-service';
import { SearchPipe } from '../../../search-pipe-pipe';


@Component({
  selector: 'app-allorder',
  imports: [NgFor,FormsModule,SearchPipe],
  templateUrl: './allorder.html',
  styleUrl: './allorder.css',
})
export class Allorder {
  allorder : any[] = []

   orders:any[]=[];
  imageUrl="http://localhost:3000/uploads/";

  searchText:string=''
  constructor(private orderService:OrderService,private cdr:ChangeDetectorRef){}

  ngOnInit(){
    this.getOrders();
  }

  getOrders(){
    this.orderService.getAllOrders().subscribe({
      next:(res:any)=>{
        this.orders = res.data;
        this.cdr.detectChanges();
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  updateStatus(orderId:any,status:any){

    this.orderService.updateStatus(orderId,status).subscribe({
      next:(res)=>{
        alert("Order Status Updated");
        this.getOrders();
      },
      error:(err)=>{
        console.log(err);
      }
    });

  }
}