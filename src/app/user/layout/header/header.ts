import { Component } from '@angular/core';
import { WishlistService } from '../../../service/wishlistService';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
wishlistCount:number = 0
userId:any=""
 uid:string|null="";
  isLoggedIn=false



constructor(private wish:WishlistService){}

ngOnInit(){
  this.uid=localStorage.getItem("id");

    if(!this.uid){
      this.isLoggedIn=false;
    }else{
      this.isLoggedIn=true;
    }
  

this.userId = localStorage.getItem("id")

// subscribe realtime count
this.wish.wishlistCount.subscribe((count)=>{
  this.wishlistCount = count
})

// initial load
this.loadWishlistCount()

}

loadWishlistCount(){

this.wish.getWishlist(this.userId).subscribe((res:any)=>{

this.wishlistCount = res.length

})

}

test(){
console.log("clicked")
}


logout(){
    if(confirm('are you sure you want to logout?')){
      localStorage.clear();
      window.location.href = '/login';
    }
  }
}
