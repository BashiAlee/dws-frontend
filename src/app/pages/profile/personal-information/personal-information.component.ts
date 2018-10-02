import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../services/profile/profile.service';


@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  personalInformation: FormGroup;
  countriesList: any;
  physicalRegionList: any;
  mailingRegionList: any;
  personalData: any;
  id: any;
  selectedSuffix;
  suffix = [
      { name: 'Jr.' },
      { name: 'Sr.' }
  ]
  constructor(private formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute, private profileSevice: ProfileService) { 

    }

  ngOnInit() {
    
    this.route.parent.url.subscribe((urlPath) => {
      this.id = urlPath[1].path;
  })
  // this.getCountriesList();
  // this.getPersonalInfo(this.id)

    this.personalInformation = this.formBuilder.group({
      firstname: ['', Validators.required],
      middleName: [''],
      lastname: ['', Validators.required],
      nameSuffix: [this.suffix[0].name],
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

  getPersonalInfo(id) {
    this.profileSevice.getProfileInfoByID(id)
    .subscribe(
      data => {
        if(data.statusCode) {
            this.personalData = data.Result[0];
            // this.getRegionByCode(this.personalData.m1Country);
            if(this.personalData.p1Country) {
              this.getRegionByCode('physical',this.personalData.p1Country)
            } 
            if(this.personalData.m1Country) {
              this.getRegionByCode('mailing',this.personalData.p1Country)
            }
            this.personalInformation.patchValue({
              firstname:this.personalData.firstname ,
              middleName: this.personalData.middleName,
              lastname: this.personalData.lastname,
              nameSuffix: this.personalData.middleName,
              dob:this.personalData.dob,
              p1StreetAddress: this.personalData.p1StreetAddress,
              p2StreetAddress:this.personalData.p2StreetAddress,
              p1Country: this.personalData.p1Country,
              p1City: this.personalData.p1City,
              p1State: this.personalData.p1State,
              p1Zip:this.personalData.p1Zip,
              m1StreetAddress: this.personalData.m1StreetAddress,
              m2StreetAddress:this.personalData.m2StreetAddress,
              m1Country: this.personalData.m1Country,
              m1City: this.personalData.m1City,
              m1State: this.personalData.m1State,
              m1Zip:this.personalData.m1Zip,
              email: this.personalData.email,
              phone: this.personalData.phone,
              gernalBiography:this.personalData.gernalBiography,
              pInfoNotes:this.personalData.pInfoNotes,
              memberNumer:this.personalData.memberNumer
            });
        } else {
          this.personalData = [];
        }
      }
    )
  }

  getCountriesList() {
    this.profileSevice.getCountries()
    .subscribe(
      data => {
        if(data.statusCode) {
          this.countriesList = data.Result;

        } else {
          this.countriesList = [];
        }
      }
    );
  }

  getRegionByCode(type,code) {
    this.profileSevice.getRegionByCode(code)
    .subscribe(
      data => {
        if(data.statusCode) {
          if(type == 'physical') {
            this.physicalRegionList = data.Result;
          } else if (type =='mailing') {
            this.mailingRegionList = data.Result;
          }
          // this.regionList = data.Result;
        } else {
          // this.regionList = [];
        }
      }
    );
  }

}
