import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  personalInformation: FormGroup;
  selectedSuffix;
  suffix = [
      { name: 'Jr.' },
      { name: 'Sr.' }
  ]
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.personalInformation = this.formBuilder.group({
      firstname: ['', Validators.required],
      middleName: [''],
      lastname: ['', Validators.required],
      nameSuffix: ['', Validators.required],
      dob: [''],
      p1StreetAddress: ['', Validators.required],
      p2StreetAddress: [''],
      p1Country: ['', Validators.required],
      p1City: ['', Validators.required],
      p1State: ['', Validators.required],
      p1Zip: [''],
      m1StreetAddress: ['', Validators.required],
      m2StreetAddress: [''],
      m1Country: ['', Validators.required],
      m1City: ['', Validators.required],
      m1State: ['', Validators.required],
      m1Zip: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      gernalBiography: [''],
      pInfoNotes: [''],
      memberNumer: ['', Validators.required]
      // password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  get form() { return this.personalInformation.controls; }

}
