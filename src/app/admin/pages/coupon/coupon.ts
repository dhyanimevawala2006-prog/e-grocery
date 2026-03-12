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
  today = new Date();

  coupons: any[] = [];

  editingId: any = null;

  couponData: any = {
    code: '',
    discountType: 'flat',
    discountValue: 0,
    minOrderAmount: 0,
    maxDiscount: 0,
    expiryDate: '',
  };

  apiUrl = 'http://localhost:3000/api/coupon';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.getCoupons();
    }, 100);
  }

  getCoupons() {
    this.http.get(`${this.apiUrl}/all`).subscribe((res: any) => {
      this.coupons = res.data || [];

      this.cdr.detectChanges();
    });
  }

  /* CREATE OR UPDATE */

  saveCoupon() {
    if (this.editingId) {
      this.http.put(`${this.apiUrl}/update/${this.editingId}`, this.couponData).subscribe(() => {
        alert('Coupon Updated');
        this.editingId = null;
        this.getCoupons();
        this.resetForm();
      });
    } else {
      this.http.post(`${this.apiUrl}/create`, this.couponData).subscribe(() => {
        alert('Coupon Created');
        this.getCoupons();
        this.resetForm();
      });
    }
  }

  /* EDIT */

  editCoupon(c: any) {
    this.editingId = c._id;

    this.couponData = {
      code: c.code,
      discountType: c.discountType,
      discountValue: c.discountValue,
      minOrderAmount: c.minOrderAmount,
      maxDiscount: c.maxDiscount,
      expiryDate: c.expiryDate?.substring(0, 10),
    };
  }

  /* DELETE */

  deleteCoupon(id: string) {
    this.http.delete(`${this.apiUrl}/delete/${id}`).subscribe(() => {
      alert('Coupon Deleted');
      this.getCoupons();
    });
  }

  /* ACTIVE / INACTIVE */

  toggleStatus(c: any) {
    const updated = {
      ...c,
      isActive: !c.isActive,
    };

    this.http.put(`${this.apiUrl}/update/${c._id}`, updated).subscribe(() => {
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

  isExpired(expiryDate: string | Date): boolean {
    if (!expiryDate) return false;

    const expiry = new Date(expiryDate);
    const now = new Date();

    return expiry.getTime() < now.getTime();
  }
}
