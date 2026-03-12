import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  apiUrl = "http://localhost:3000/api/orders/";

  constructor(private http: HttpClient) {}

  // PLACE ORDER
  createOrder(data:any):Observable<any>{
    return this.http.post(this.apiUrl + "create",data);
  }

  // GET USER ORDERS
  getUserOrders(userId:any):Observable<any>{
    console.log(this.apiUrl + "user/" + userId);
    
    return this.http.get(this.apiUrl + "user/" + userId);
  }

  // GET ALL ORDERS (ADMIN)
  getAllOrders():Observable<any>{
    return this.http.get(this.apiUrl + "all");
  }

  // UPDATE ORDER STATUS
  updateStatus(orderId:any,status:any):Observable<any>{
    return this.http.put(this.apiUrl + "status/" + orderId,{
      status:status
    });
    
  }

  
}