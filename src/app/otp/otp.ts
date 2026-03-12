import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../service/user-service';

@Component({
  selector: 'app-otp',
  imports: [FormsModule],
  templateUrl: './otp.html',
  styleUrl: './otp.css',
})
export class Otp {
  otp: any = '';

  constructor(private userService: UserService) {}

  // move cursor forward
  moveNext(event: any, next: any) {
    if (event.target.value.length === 1) {
      next.focus();
    }
  }

  // move cursor backward
  movePrev(event: any, prev: any) {
    if (event.key === 'Backspace' && event.target.value === '') {
      prev.focus();
    }
  }

  // combine otp boxes
  submitOtp(code: string) {
    this.otp = code;
    this.verifyOtp();
  }

  verifyOtp() {
    const data = {
      otp: this.otp,
      verificationId: localStorage.getItem('verificationId'),
      userData: JSON.parse(localStorage.getItem('userData')!),
    };

    this.userService.verifyOtp(data).subscribe({
      next: (res: any) => {
        alert(res.message || 'OTP verified successfully');

        // clear stored data
        localStorage.removeItem('verificationId');
        localStorage.removeItem('userData');

        window.location.href = '/';
      },

      error: (err: any) => {
        alert(err.error?.message || 'Invalid OTP');
      },
    });
  }
}
