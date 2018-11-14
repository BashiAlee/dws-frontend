// declare var require: any;

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalsComponent } from '../../components/modals/modals.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  success: any;
  bsModalRef: BsModalRef;
  error: any;
  loginForm: FormGroup;
  loading: any;
  rememberMe: any;
  config = {
    class: "custom-modal modal-dialog-centered modal-md successModal"
  };
  constructor(private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private auth: AuthenticationService, private router: Router) {
    // localStorage.removeItem('user')
  }
  user: any;
  type: any;
  ngOnInit() {
    if(this.router.url.split('/')[1]=='loginpilot') {
      this.type = 'pilot'
    }
    if(this.router.url.split('/')[1]=='logincustomer') {
      this.type = 'customer'
    }
    this.loginForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['',Validators.required],
      Role: []
    })

    if(localStorage.getItem('rememberMe')) {
      this.rememberMe = true;
      var data = JSON.parse(localStorage.getItem('rememberMe'));
      this.loginForm.patchValue({
        Email: data.Email,
        Password: data.Password,
        Role: this.type
      })
    }
  }

  get form() {return this.loginForm.controls}

  login() {
    this.loginForm.patchValue({
      Role: this.type
    });
    this.loading = true;
    this.success = '';
    this.error = '';
    this.auth.login(this.loginForm.value)
    .subscribe(
      data => {

        if(data.status) {
          if(this.rememberMe) {
            localStorage.setItem('rememberMe', JSON.stringify(this.loginForm.value))
          } else {
            localStorage.removeItem('rememberMe')
          }
          this.loading = false;
          this.success = data.message;
          this.user = data.result;

          localStorage.setItem('user',JSON.stringify(this.user))

          if(this.type == "pilot"){
            this.router.navigate(['/user/profile/' + this.user.ID]);
          }else{
            console.log("customer")
            this.router.navigate(['/user/dashboard/']);
          }

        } else if(!data.status) {
          this.loading = false;
          this.error = data.message;
        }
      }
    )
  }

}
