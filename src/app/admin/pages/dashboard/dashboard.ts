import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user-service';
import { ProductService } from '../../../service/product-service';
import { OrderService } from '../../../service/order-service';
import { CommonModule } from '@angular/common';

declare const Chart: any;

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  ocount = 0;
  pcount = 0;
  ucount = 0;
  totalrevenue = 0;

  constructor(
    private userservice: UserService,
    private productservice: ProductService,
    private orderservice: OrderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadUsers();
    this.loadProducts();
    this.loadOrders();
    this.loadChart();
  }

  // USERS COUNT
  loadUsers() {
    this.userservice.get().subscribe({
      next: (res: any) => {

        const users = res.data || res;

        this.ucount = users.length;

        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  // PRODUCTS COUNT
  loadProducts() {
    this.productservice.get().subscribe({
      next: (res: any) => {

        const products = res.data || res;

        this.pcount = products.length;

        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  // ORDERS + REVENUE
  loadOrders() {
    this.orderservice.getAllOrders().subscribe({
      next: (res: any) => {

        const orders = res.data || res;

        this.ocount = orders.length;

        this.totalrevenue = orders.reduce((sum: number, order: any) => {
          return sum + (order.totalAmount || 0);
        }, 0);

        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  // CHART
  loadChart() {

    setTimeout(() => {

      const canvas = document.getElementById('dashboardChart') as HTMLCanvasElement;

      if (!canvas) return;

      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
          datasets: [
            {
              label: 'Orders',
              data: [3,8,7,12,9,11,7],
              borderColor: '#1e6355',
              backgroundColor: 'rgba(30,99,85,0.2)',
              tension: 0.4,
              fill: true
            },
            {
              label: 'Users',
              data: [5,7,10,8,15,14,12],
              borderColor: '#9ad6ca',
              backgroundColor: 'rgba(154,214,202,0.2)',
              tension: 0.4,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });

    },100);
  }

}