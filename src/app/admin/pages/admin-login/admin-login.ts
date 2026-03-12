import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidation } from '../../../custom-validation/custom-validation';
import { AdminService } from '../../../service/admin-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, CustomValidation, CommonModule],
  templateUrl: './admin-login.html',
  styleUrls: ['./admin-login.css'],
})
export class AdminLogin {
  frmGrp: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {
    this.frmGrp = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onsubmit() {
    this.frmGrp.markAllAsTouched();

    if (this.frmGrp.valid) {
      const email = this.frmGrp.value.email;
      const password = this.frmGrp.value.password;

      // Static admin credentials check
      if (email === 'dk@gmail.com' && password === 'dk2006') {
        // Success - set local storage
        localStorage.setItem('adminId', '1');
        localStorage.setItem('adminName', 'DK Admin');
        localStorage.setItem('adminEmail', email);
        localStorage.setItem('adminRole', 'admin');

        alert('Admin login successful!');
        this.router.navigate(['/admin/dashboard']);
      } else {
        alert('Invalid email or password!');
      }
    }
  }
}
