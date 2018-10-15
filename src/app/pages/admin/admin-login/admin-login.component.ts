import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  loginForm: FormGroup
  constructor(private authService: AuthenticationService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['',Validators.required],
      Role: ['admin']
    })
    // localStorage.removeItem('user')
   }

  ngOnInit() {
  }

  get form() {return this.loginForm.controls}
  login() {
    this.authService.adminlogin(this.loginForm.value)
    .subscribe(
      data => {
        if(data.status) {
          localStorage.setItem('admin',JSON.stringify(data.result));
          this.router.navigate(['admin/pilot-list']);
        } else if(!data.status) {
          alert("Invalid Login")
        }
      }
    )
  }

}
