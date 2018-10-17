import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  success: any;
  error: any;
  type: any;
  loading: any;
  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private route: ActivatedRoute, private router: Router) {

    console.log(this.router.url.split('/'),"sdfsdf")
    if(this.router.url.split('/')[1]=='signuppilot') {
      this.type = 'Pilot'
    }
    if(this.router.url.split('/')[1]=='signupcustomer') {
      this.type = 'Customer'
    }
   }
  ngOnInit() {
    
    this.signupForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      FirstName: ['', Validators.required],
      MiddleName: ['',Validators.required],
      LastName: ['',Validators.required],
      Phone: ['',[Validators.required]],
      Role: [this.type,Validators.required],
      Password: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      ConfirmPassword: ['',[Validators.required,Validators.minLength(8), Validators.maxLength(100)]]
    })
  }

  get form() { return this.signupForm.controls; }

  signUp() {
    this.loading = true;
    this.success = '';
    this.error = '';
    delete this.signupForm.value.ConfirmPassword;
    this.authService.signup(this.signupForm.value)
    .subscribe(
      data => {
        if(data.status) {
          this.loading = false;
          this.success = data.message;
        } else if(!data.status) {
          this.error = data.message;
          this.loading = false;
        }
      }
    )
  }

}
