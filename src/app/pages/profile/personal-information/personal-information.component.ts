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
  profileImage :any;
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
  this.getCountriesList();
  this.getPersonalInfo(this.id)

    this.personalInformation = this.formBuilder.group({
      Suffix: [this.suffix[0].name],
      ID:[],
      UserId: [],
      Users: this.formBuilder.group({
        Email: ['', [Validators.required, Validators.email]],
        FirstName: ['',Validators.required],
        MiddleName: [''],
        LastName: ['',Validators.required],
        Dob: [''],
        Phone: ['',Validators.required],
        Role: [''],
        Token: ['',],
        AccountStatus: [''],
        ProfileImage: ['../../../../assets/images/avatar.png'],
        MemberId: [''],
        ID:[]
      }),
      PhysicallAddressLine1: ['', Validators.required],
      PhysicallAddressLine2: [''],
      PhysicallCountry: ['', Validators.required],
      PhysicallCity: ['', Validators.required],
      PhysicallState: ['', Validators.required],
      PhysicallZip: [''],
      SameAsPhysical: [false],
      MailingAddressLine1: ['', Validators.required],
      MailingAddressLine2: [''],
      MailingCountry: ['', Validators.required],
      MailingCity: ['', Validators.required],
      MailingState: ['', Validators.required],
      MailingZip: [''],
      PrimaryEmail: ['', [Validators.required, Validators.email]],
      PrimaryPhone: ['', Validators.required],
      GeneralInformation: [''],
      Notes: ['']
      // password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  get form() { return this.personalInformation.controls; }

  getPersonalInfo(id) {
    this.profileSevice.getProfilePersonalInfoByID(id)
    .subscribe(
      data => {
        if(data.status) {
            this.personalData = data.result;
            // this.getRegionByCode(this.personalData.m1Country);
            if(this.personalData.PhysicallCountry) {
              // this.getRegionByCode('physical',this.personalData.PhysicallCountry)
            } 
            if(this.personalData.MailingCountry) {
              // this.getRegionByCode('mailing',this.personalData.PhysicallCountry)
            }
            
            this.profileImage = this.personalData.Users.ProfileImage;
            this.personalInformation.patchValue(Object.assign({}, this.personalData));
            // var date = new Date(this.personalData.Users.Dob)
            // this.personalInformation.patchValue({
            //   Users: {
            //     // Dob: m
            //   }
            // })
            console.log("FFFF", this.personalInformation.value)
            // this.personalInformation.patchValue({
            //   firstname:this.personalData.firstname ,
            //   middleName: this.personalData.middleName,
            //   lastname: this.personalData.lastname,
            //   nameSuffix: this.personalData.middleName,
            //   dob:this.personalData.dob,
            //   p1StreetAddress: this.personalData.p1StreetAddress,
            //   p2StreetAddress:this.personalData.p2StreetAddress,
            //   p1Country: this.personalData.p1Country,
            //   p1City: this.personalData.p1City,
            //   p1State: this.personalData.p1State,
            //   p1Zip:this.personalData.p1Zip,
            //   m1StreetAddress: this.personalData.m1StreetAddress,
            //   m2StreetAddress:this.personalData.m2StreetAddress,
            //   m1Country: this.personalData.m1Country,
            //   m1City: this.personalData.m1City,
            //   m1State: this.personalData.m1State,
            //   m1Zip:this.personalData.m1Zip,
            //   email: this.personalData.email,
            //   phone: this.personalData.phone,
            //   gernalBiography:this.personalData.gernalBiography,
            //   pInfoNotes:this.personalData.pInfoNotes,
            //   memberNumer:this.personalData.memberNumer
            // });
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
        if(data.status) {
          this.countriesList = data.result;

        } else {
          this.countriesList = [];
        }
      }
    );
  }

  getStatesByCode(type,code) {
    this.profileSevice.getStatesByCode(code)
    .subscribe(
      data => {
        if(data.status) {
          if(type == 'physical') {
            this.physicalRegionList = data.result;
          } else if (type =='mailing') {
            this.mailingRegionList = data.result;
          }
          // this.regionList = data.Result;
        } else {
          // this.regionList = [];
        }
      }
    );
  }

  save() {
    console.log("FFFF")
    this.profileSevice.updatePersonalInformation(this.personalInformation.value)
    .subscribe(data => {
      console.log("Dta", data)
    })
  }

  uploadImage(file) {
    console.log("DDD", file)
    this.profileSevice.uploadProfilePicture(file)
    .subscribe(
      data => {
        if(data.status) {
          this.personalInformation.controls.Users.patchValue({
            ProfileImage: data.result
          })
          // setTimeout(() => {
            this.profileImage = data.result;
          // }, 2000);
          
        }
      }
    );
  }

}
