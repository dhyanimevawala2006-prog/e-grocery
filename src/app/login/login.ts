import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CustomValidation } from '../custom-validation/custom-validation'; // Standalone component
import { UserService } from '../service/user-service';

@Component({
  selector: 'app-login',
  standalone: true,       // ✅ mark as standalone
  imports: [RouterLink, ReactiveFormsModule, CustomValidation],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],  // corrected typo
})
export class Login {
  frmGrp: FormGroup;

  constructor(private fb: FormBuilder,private u_service:UserService) {
    this.frmGrp = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onsubmit() {
  // First mark all controls as touched
  this.frmGrp.markAllAsTouched();

  // Then check if the form is valid
  if (this.frmGrp.valid) {
    this.u_service.login(this.frmGrp.value).subscribe({
      next: (res:any) => {
        alert(res.message);
        sessionStorage.setItem("id",res.user.id);
        sessionStorage.setItem("name",res.user.username);
        sessionStorage.setItem("email",res.user.email);
        sessionStorage.setItem("mobileno",res.user.mobileno);

        window.location.href="/";
      },
      error: (err:any) => {
        alert(err.error.message);
      }
    })
  } 
  
}

}
