import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http:HttpClient){}
  url="http://localhost:3000/api/"

  add(data:any){
    return this.http.post(this.url+"add",data)

  }
  get(){
    return this.http.get(this.url+"all")
  }
  getbyid(id:any){
    return this.http.get(this.url+"get/"+id)
  }

   updateProduct(id:any,data:any){
    return this.http.put(this.url + "update/" + id , data);
  }
  // deleteProduct(id:any){
  //   return this.http.delete(this.url+"delete/"+id)
  // } 
  deleteProduct(id: any) {
  return this.http.delete("http://localhost:3000/api/delete/" + id);
}
  // update(data:any){
  //   return this.http.put(this.url+"update",data)
  // }
  
  
}
