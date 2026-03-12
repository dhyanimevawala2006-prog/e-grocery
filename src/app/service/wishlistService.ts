import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  api = 'http://localhost:3000/api';

  wishlistCount = new BehaviorSubject<number>(0);
  wishlistItems = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  addWishlist(data: any) {
    return this.http.post(this.api + '/wishlist', data);
  }

  getWishlist(userId: any) {
    return this.http.get(this.api + '/wishlist/' + userId);
  }

  removeWishlist(id: any) {
    return this.http.delete(this.api + '/wishlist/' + id);
  }

  setWishlistCount(count: number) {
    this.wishlistCount.next(count);
  }

  setWishlistItems(items: any[]) {
    this.wishlistItems.next(items);
  }
}
