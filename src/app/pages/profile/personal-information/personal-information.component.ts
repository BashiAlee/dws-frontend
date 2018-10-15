import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ChildActivationStart } from '@angular/router';
import { ProfileService } from '../../../services/profile/profile.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalsComponent } from '../../../components/modals/modals.component';
import { AuthenticationService } from '../../../services/authentication/authentication.service';


@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  personalInformation: FormGroup;
  bsModalRef: BsModalRef;
  countriesList: any;
  physicalRegionList: any;
  mailingRegionList: any;
  personalData: any;
  imageFile: any;
  id: any;
  selectedSuffix;
  profileImage :any;
  suffix = [
      { name: 'Jr.' },
      { name: 'Sr.' }
  ]

  config = {
    class: "custom-modal modal-dialog-centered modal-lg successModal"
  };
  isAdmin: any;
  constructor(private formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute, private profileSevice: ProfileService,
    private modalService: BsModalService, private authService: AuthenticationService) { 
      if(this.router.url.split('/')[1] =='admin') {
        this.isAdmin = true;
      }
      // this.personalData.CreatedAt = this.auth.getCurrentUser().CreatedAt;
    }

  ngOnInit() {

    // this.modalService._showModal(ModalsComponent)
    this.route.parent.url.subscribe((urlPath) => {
      this.id = parseInt(urlPath[1].path);
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
        ProfileImage: [],
        MemberId: [''],
        ID:[]
      }),
      PhysicallAddressLine1: ['', Validators.required],
      PhysicallAddressLine2: [''],
      PhysicallCountry: ['', Validators.required],
      PhysicallCity: ['', Validators.required],
      PhysicallState: ['', Validators.required],
      PhysicallZip: [''],
      SameAsPhysical: [0],
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
  // this.modalRef = this.modalService.(ModalsComponent);

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
              this.getStatesByCode('physical',this.personalData.PhysicallCountry,'onload')
            } 
            if(this.personalData.MailingCountry) {
              this.getStatesByCode('mailing',this.personalData.MailingCountry,'onload')
            }
            
            this.profileImage = this.personalData.Users.ProfileImage;
            this.personalInformation.patchValue(Object.assign({}, this.personalData));
            // this.personalInformation.patchValue({
            //    UserId: this.authService.getCurrentUser().ID,
            //    ID: this.authService.getCurrentUser().ID
            // })
          
            
            // this.personalInformation.controls.Users.patchValue(Object.assign({}, this.authService.getCurrentUser()));
            // var date = new Date(this.personalData.Users.Dob)
            // delete this.personalInformation.value.Users.MemberId
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
 
  getStatesByCode(type,code, value) {
    if(value== 'change' && type == 'physical') {
      this.personalInformation.patchValue({
        PhysicallState: ''
      })
    }
    if(value== 'change' && type == 'mailing') {
      this.personalInformation.patchValue({
        MailingState: ''
      })
    }
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
    // console.log(this.personalInformation.value)

   
    // delete this.personalInformation.value.Users.MemberId
    this.personalInformation.value.PrimaryPhone = this.personalInformation.value.PrimaryPhone.toString();
    if(this.imageFile) {
      this.profileSevice.uploadProfilePicture(this.imageFile)
      .subscribe(data => {
        if(data.status) {
          const initialState = {
            type: 'success',
            page: 'business-information',
            id: this.id
          }
          this.personalInformation.controls.Users.patchValue({
            ProfileImage: data.result
          })
          this.profileSevice.updatePersonalInformation(this.personalInformation.value)
          .subscribe(data => {
            if(data.status) {
              localStorage.setItem('user', JSON.stringify(data.result))
              this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
              this.bsModalRef.content.closeBtnName = 'Close';
            } else if(!data.status) {
              const initialState = {
                type: 'error'
              }
              this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
              this.bsModalRef.content.closeBtnName = 'Close';
            }
            
            
          })
        } else if(!data.status){
          const initialState = {
            type: 'error'
          }
          this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
          this.bsModalRef.content.closeBtnName = 'Close';
        }
  
      });
    } else {
      this.profileSevice.updatePersonalInformation(this.personalInformation.value)
      .subscribe(data => {
        if(data.status) {
          const initialState = {
            type: 'success',
            page: 'business-information',
            id: this.id
          }
          localStorage.setItem('user', JSON.stringify(data.result))
          this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
          this.bsModalRef.content.closeBtnName = 'Close';
        } else if(!data.status){
          const initialState = {
            type: 'error'
          }
          this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
          this.bsModalRef.content.closeBtnName = 'Close';
        }

        
        
      })
    }


  }

  uploadImage(file) {
      
    this.imageFile = file;
          if (file.target.files && file.target.files[0]) {
            var reader = new FileReader();
        
            reader.onload = (event:any) => {
              this.profileImage = event.target.result;
            }
        
            reader.readAsDataURL(file.target.files[0]);
            // this.messages.uploadingImage = false;
          }

         
            // this.accountInfo.ProfilePicture =this.imageName
            // this.accountInformation.patchValue(
            //   {
            //     profilepicture: this.imageName
            //   }
            // );
          
  //   if(event.target.files[0]) {
  //     let isImageValid = event.target.files[0].type.split('/')[0];
  //     if(isImageValid === 'image') {
  //         // this.setState({
  //         //     avatarImageFile: event.target.files[0]
  //         // });
  //         if (event.target.files && event.target.files[0]) {
  //             let reader = new FileReader();
  //             reader.onload = (e) => {
  //               this.profileImage = e.target.result
  //                 // this.setState({
  //                 //     avatarImage:  e.target.result,
  //                 //     isAvatarInTransition: true
  //                 // })
  //             };
  //             reader.readAsDataURL(event.target.files[0]);
  //         }
  //     }
  // }
    // console.log("DDD", file)
    // this.profileSevice.uploadProfilePicture(file)
    // .subscribe(
    //   data => {
    //     if(data.status) {
    //       this.personalInformation.controls.Users.patchValue({
    //         ProfileImage: data.result
    //       })
    //       setTimeout(() => {
    //         this.profileImage = data.result;
    //       }, 6000);
          
    //     }
    //   }
    // );
  }

  cloneValues(value) {

      this.personalInformation.patchValue({
        MailingAddressLine1: '',
        MailingAddressLine2: '',
        MailingCity: '',
        MailingState: '',
        MailingCountry: '',
        MailingZip: ''
      })
    }

}
