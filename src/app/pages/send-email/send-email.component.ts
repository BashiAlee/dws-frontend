import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class SendEmailComponent implements OnInit {
  email: FormGroup;
  success: any;
  error: any;
  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService) { }

  ngOnInit() {
    this.email = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
    })
  }

  get form() {return this.email.controls}
  sendEmail() {
    this.authService.sendEmail(this.email.value)
    .subscribe(data => {
      if(data.status) {
        this.success = data.message;
        this.email.patchValue({
          Email: ''
        })
      } else if(!data.status) {
        this.error = data.message;
      }
    })
  }
}
