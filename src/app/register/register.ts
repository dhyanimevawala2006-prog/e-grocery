import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomValidation } from '../custom-validation/custom-validation';
import { UserService } from '../service/user-service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, CustomValidation],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  frmGrp!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private uService: UserService,
  ) {
    this.frmGrp = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      mobileno: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    });
  }

  onsubmit() {
    this.frmGrp.markAllAsTouched();

    if (this.frmGrp.valid) {
      this.uService.sendOtp(this.frmGrp.value).subscribe({
        next: (res: any) => {
          localStorage.setItem('verificationId', res.verificationId);
          localStorage.setItem('userData', JSON.stringify(this.frmGrp.value));

          alert('OTP sent to your mobile');

          window.location.href = '/otp';
        },

        error: (err: any) => {
          alert(err.error.message);
        },
      });
    }
  }
}
