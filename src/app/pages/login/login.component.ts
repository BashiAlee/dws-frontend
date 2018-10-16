// declare var require: any;

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  success: any;
  error: any;
  loginForm: FormGroup;
  loading: any;
  rememberMe: any;
  constructor(private formBuilder: FormBuilder, private auth: AuthenticationService, private router: Router) {
    // localStorage.removeItem('user')
  }
  user: any;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['',Validators.required]
    })

    if(localStorage.getItem('rememberMe')) {
      this.rememberMe = true;
      var data = JSON.parse(localStorage.getItem('rememberMe'));
      this.loginForm.patchValue({
        Email: data.Email,
        Password: data.Password
      })
    }
  }

  get form() {return this.loginForm.controls}

  login() {
    if(this.rememberMe) {
      localStorage.setItem('rememberMe', JSON.stringify(this.loginForm.value))
    } else {
      localStorage.removeItem('rememberMe')
    }
    this.loading = true;
    this.success = '';
    this.error = '';
    this.auth.login(this.loginForm.value)
    .subscribe(
      data => {
  
        if(data.status) {
          this.loading = false;
          this.success = data.message;
          this.user = data.result;

          localStorage.setItem('user',JSON.stringify(this.user))

          this.router.navigate(['/user']);
        } else if(!data.status) {
          this.loading = false;
          this.error = data.message;
        }
      }
    )
  }

}
