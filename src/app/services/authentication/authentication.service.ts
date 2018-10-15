import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment"
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl : any;
  staticUrl: any;
  constructor(private http: Http, private router: Router) {
      this.apiUrl = environment.apiURL;
      this.staticUrl = environment.uploadUrl;
   }
   login(data) {
    return this.http.post(this.apiUrl + 'pilot/login',data)
    .pipe(map((response: any) => {
     return response.json();
    }));
  }
  adminlogin(data) {
    return this.http.post(this.apiUrl + 'admin/login',data)
    .pipe(map((response: any) => {
     return response.json();
    }));
  }

  signup(data) {
    return this.http.post(this.apiUrl + 'pilotSignup',data)
    .pipe(map((response: any) => {
     return response.json();
    }));
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  verifyToken(token) {
    return this.http.get(this.apiUrl + 'pilot/verifyToken/'+token)
    .pipe(map((response: any) => {
     return response.json();
    }));
  }

  sendEmail(data) {
    return this.http.post(this.apiUrl + 'pilot/forgotPassword',data)
    .pipe(map((response: any) => {
     return response.json();
    }));
  }

  verifyForgotPassword(token) {
    return this.http.get(this.apiUrl + 'pilot/verifyTokenForgotPassword/'+token)
    .pipe(map((response: any) => {
     return response.json();
    }));
  }
  changePassword(data) {
    return this.http.post(this.apiUrl + 'pilot/changePassword',data)
    .pipe(map((response: any) => {
     return response.json();
    }));
  }
}
