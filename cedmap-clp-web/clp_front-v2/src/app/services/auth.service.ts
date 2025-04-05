import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http :HttpClient,
    private router:Router,
    // private as:AlertService,
    private ts : TokenService

  ) {
}

  getList(data:any) {
    return this.http.post(`${environment.url}/auth/getList`, data);
  }

  register(data:any) {
    return this.http.post(`${environment.url}/auth/register`, data);
  }

  login(data:any) {
    return this.http.post(`${environment.url}/auth/userlogin`, data);
  }

  authlogin(data:any) {
    return this.http.post(`${environment.url}/auth/authlogin`, data);
  }

  forgetPassword(data:any) {
    return this.http.post(`${environment.url}/auth/forget-password`, data);
  }

  resetPassword(data:any) {
    return this.http.post(`${environment.url}/auth/reset-password`, data);
  }
  sendOtp(data:any) {
    return this.http.post(`${environment.url}/auth/sendotp`, data);
  }
   verifyOtp(data:any) {
    return this.http.post(`${environment.url}/auth/getOtpVerification`, data);
  }

  updateById(data:any) {
    return this.http.post(`${environment.url}/auth/updateById`, data);
  }

  isLoggedIn(): boolean {
    if (this.ts.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {
  //  this.as.infoToast('You are logged out.');
    this.cleanUserData();
    this.router.navigate(['/login'])
    // }
    // );
  }

  cleanUserData() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refershToken');
    this.router.navigate(['/']);
  }
}
