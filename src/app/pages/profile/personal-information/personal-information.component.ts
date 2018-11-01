import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../../services/profile/profile.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalsComponent } from '../../../components/modals/modals.component';
import { AuthenticationService } from '../../../services/authentication/authentication.service';


import { Croppie } from 'croppie/croppie';

import { CroppieDirective } from '../../../../angular-croppie-module/src/lib/croppie.directive';

declare var $: any;
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
  imageChangedEvent: any;
  id: any;
  selectedSuffix;
  profileImage :any;
  displayPicture: any;
  croppedImage: any;
  suffix = [
      { name: 'Jr.' },
      { name: 'Sr.' }
  ]
  loading: any;
  messages: any = {};
  croppedImageData: any = {};
  config = {
    class: "custom-modal modal-dialog-centered modal-md successModal"
  };
  isAdmin: any;
  constructor(private formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute, private profileSevice: ProfileService,
    private modalService: BsModalService, private authService: AuthenticationService) { 
      if(this.router.url.split('/')[1] =='admin') {
        this.isAdmin = true;
      }
      $('html, body').stop().animate({scrollTop: 0}, 500);  
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
            // if(!this.personalData.PhysicallCountry && !this.personalData.PhysicallState &&  !this.isAdmin) {
            //   const initialState = {
            //     type: 'old-user-empty',
            //   }
            //   this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
            //   this.bsModalRef.content.closeBtnName = 'Close';
            //   // return;
            // }
            // this.getRegionByCode(this.personalData.m1Country);
            if(this.personalData.PhysicallCountry) {
              this.getStatesByCode('physical',this.personalData.PhysicallCountry,'onload')
            } 
            if(this.personalData.MailingCountry) {
              this.getStatesByCode('mailing',this.personalData.MailingCountry,'onload')
            }

            if (this.personalData.PhysicallCountry < 0) {
              this.personalData.PhysicallCountry = 231;
              this.getStatesByCode('physical',this.personalData.PhysicallCountry,'onload')
            }

            if (this.personalData.MailingCountry < 0) {
              this.personalData.MailingCountry = 231;
              this.getStatesByCode('mailing',this.personalData.MailingCountry,'onload')
            }
            // this.check(this.personalData.Users.ProfileImage)
            // this.checkImageExists(this.personalData.Users.ProfileImage);
            this.displayPicture = this.personalData.Users.ProfileImage;
            this.personalInformation.patchValue(Object.assign({}, this.personalData));
      

            console.log("FFFF", this.personalInformation.value)
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
            if(value == 'onload' && this.personalData.PhysicallState < 0) {
              this.personalInformation.patchValue({
                PhysicallState: this.physicalRegionList[0].ID
              })
            }
           
          } else if (type =='mailing') {
            this.mailingRegionList = data.result;
            if(value == 'onload' && this.personalData.MailingState < 0) {
              this.personalInformation.patchValue({
                MailingState: this.mailingRegionList[0].ID
              })
            }
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
    this.loading = true;
   
    // delete this.personalInformation.value.Users.MemberId
    this.personalInformation.value.PrimaryPhone = this.personalInformation.value.PrimaryPhone.toString();
    if(this.imageFile) {
      this.profileSevice.uploadProfilePicture(this.imageFile)
      .subscribe(data => {
        if(data.status) {
          this.loading = false;
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
              this.loading = false;
            }
            
            
          })
        } else if(!data.status){
          const initialState = {
            type: 'error'
          }
          this.loading = false;
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
          this.loading = false;
          localStorage.setItem('user', JSON.stringify(data.result))
          this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
          this.bsModalRef.content.closeBtnName = 'Close';
        } else if(!data.status){
          const initialState = {
            type: 'error'
          }
          this.loading = false;
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

    uploadCoverImage(file) {
      this.messages.coverImageChoosed = true;
      var target = file.target || file.srcElement
      this.croppedImageData.imageName = target.files[0].name;
      this.imageChangedEvent = file;
      if (file.target.files && file.target.files[0]) {
        var reader = new FileReader();
  
        reader.onload = (event: any) => {
          this.croppieDirective.croppie.bind({ url: event.target.result});
          // this.displayPicture = event.target.result;
         
        }
        reader.readAsDataURL(file.target.files[0]);
      }
    }
    uploadCroppedImage(file) {
      this.messages.uploadingImage = true;
      this.messages.coverImageChoosed = false;
      fetch(file.base64)
      .then(res => res.blob())
      .then(blob => {
        var file1 = new File([blob], file.imageName);
        this.profileSevice.uploadCroppedImage(file1, file.imageName)
          .subscribe(data => {
            if (data) {
              if(data.status) {
                this.personalInformation.controls.Users.patchValue({
                  ProfileImage: data.result
                  })
              }
              this.messages.uploadingImage = false;
            }
  
          })
      })
  
    }
    
    public croppieOptions: Croppie.CroppieOptions = {
      boundary: { width: 250, height: 250 },
      viewport: { width: 200, height: 200 },
     
      enableOrientation: true,
    };
    @ViewChild('croppie')
    
    
    public croppieDirective: CroppieDirective;
  
    handleUpdate(data) {
      var x = this.croppieDirective.croppie.result('canvas','original').then(function (src) {
        return src;
        
    });
  
    this.deepdive(x);
      
    }

    deepdive(e){  
      e.then((value)=> {
        this.croppedImageData.base64 = value;
       this.croppedImage = value;
       this.displayPicture = value;
      });
  
    }

    zoomPic(url) {
  
        var initialState  = {
          data: url,
          type: 'zoom-admin'
        };
        var config  = {
          class: 'custom-modal modal-dialog-centered modal-lg'
        }
        this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
      
    }

    
    
    check(url) {
      this.authService.checkImageExists(url)
      .subscribe(data =>{
        this.displayPicture = url;
      },
      err => {
        this.displayPicture = "";
      })
    }
}
