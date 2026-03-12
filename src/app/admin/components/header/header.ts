import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../service/admin-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  adminName: string = 'Admin';
  adminEmail: string = '';

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit() {
    this.adminName = this.adminService.getAdminName() || 'Admin';
    this.adminEmail = this.adminService.getAdminId() || '';
  }

  toggleSidebar() {
    document.getElementById('sidebar')?.classList.toggle('active');
  }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      this.adminService.logout();
      this.router.navigate(['/admin/login']);
    }
  }
}
