import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-coupon',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './coupon.html',
  styleUrls: ['./coupon.css'],
})
export class Coupon implements OnInit {
  coupons: any[] = [];

  couponData: any = {
    code: '',
    discountType: 'flat',
    discountValue: 0,
    minOrderAmount: 0,
    maxDiscount: 0,
    expiryDate: '',
  };

  apiUrl = 'http://localhost:3000/api/coupon';

  // constructor(private http: HttpClient) {}
  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    console.log('Coupon page loaded');

    setTimeout(() => {
      this.getCoupons();
    }, 100);
  }

  getCoupons() {
    console.log('Calling coupon API');

    this.http.get(`${this.apiUrl}/all`).subscribe((res: any) => {
      console.log('Full API response:', res);

      this.coupons = res.data || [];

      console.log('Coupons assigned:', this.coupons);

      this.cdr.detectChanges(); // ⭐ force UI update
    });
  }

  createCoupon() {
    this.http.post(`${this.apiUrl}/create`, this.couponData).subscribe((res: any) => {
      alert('Coupon Created');

      this.getCoupons();

      this.resetForm();
    });
  }

  deleteCoupon(id: string) {
    this.http.delete(`${this.apiUrl}/delete/${id}`).subscribe(() => {
      alert('Coupon Deleted');

      this.getCoupons();
    });
  }

  resetForm() {
    this.couponData = {
      code: '',
      discountType: 'flat',
      discountValue: 0,
      minOrderAmount: 0,
      maxDiscount: 0,
      expiryDate: '',
    };
  }

  trackById(index: number, item: any) {
    return item._id;
  }
}
