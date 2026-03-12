import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  // ================= SEND OTP =================
  sendOtp(data: any) {
    return this.http.post(this.url + 'send-otp', data);
  }

  // ================= VERIFY OTP =================
  verifyOtp(data: any) {
    return this.http.post(this.url + 'verify-otp', data);
  }

  // ================= REGISTER =================
  register(data: any) {
    return this.http.post(this.url + 'register', data);
  }

  // ================= LOGIN =================
  login(data: any) {
    return this.http.post(this.url + 'login', data);
  }

  // ================= GET USERS =================
  get() {
    return this.http.get(this.url + 'all');
  }
  getUsers(){
 return this.http.get("http://localhost:3000/api/users");
}

deleteUser(id:any){
 return this.http.delete("http://localhost:3000/api/delete-user/"+id);
}
}
