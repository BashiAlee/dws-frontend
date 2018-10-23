// declare var require: any;

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent{
  success: any;
  error: any;
  forgotForm: FormGroup;
  token: any;
  email: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) {
    // localStorage.removeItem('user')
  }
  user: any;
  Verified: any;
  ngOnInit() {

    var url_string = window.location.href; //window.location.href
    var url = new URL(url_string);
    this.token = url.searchParams.get("token");
    this.email = url.searchParams.get("email");

    console.log(this.token, this.email)

    this.verifyForgetToken(this.token)
    this.forgotForm = this.formBuilder.group({
      Email: [this.email],
      Password: ['',Validators.required]
    })
    
  }

  verifyForgetToken(token) {
    this.authService.verifyForgotPassword(token)
    .subscribe(
      data => {
        if(data.status) {
          this.Verified = true;
        } else if(!data.status) {
          this.Verified = false;
        }
      }
    )
  }

  changePassword() {

    this.authService.changePassword(this.forgotForm.value)
    .subscribe(
      data => {
        if(data.status) {
          this.success = 'Password Updated'
          setTimeout(() => {
            this.router.navigate(['/loginpilot']);
          }, 1000);
          // this.router.navigate(['/logincustomer']);
        } else if(!data.status) {
          this.error = 'Error Updating Password'

        }
      }
    )
  }

  get form() {return this.forgotForm.controls}



}
