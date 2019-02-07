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
import { Location } from '@angular/common';

declare var $: any;
@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss']
})
export class CustomerProfileComponent implements OnInit {
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
  success: any;
  error: any;
  constructor(private formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute, private profileSevice: ProfileService,
    private location: Location,
    private modalService: BsModalService, private authService: AuthenticationService) {
      if(this.router.url.split('/')[1] =='admin') {
        this.isAdmin = true;
      }
      $('html, body').stop().animate({scrollTop: 0}, 500);
      // this.personalData.CreatedAt = this.auth.getCurrentUser().CreatedAt;
    }

  ngOnInit() {
    this.id = parseInt(this.router.url.split('/')[4])
    
    // this.modalService._showModal(ModalsComponent)
  //   this.route.parent.url.subscribe((urlPath) => {
  //     console.log("DDDD", urlPath)
  //     this.id = parseInt(urlPath[2].path);
  // })

  this.getPersonalInfo(this.id)

    this.personalInformation = this.formBuilder.group({
 
     

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
        ID:[],

      PrimaryEmail: ['', [Validators.required, Validators.email]],
      PrimaryPhone: ['', Validators.required]
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

      
            this.displayPicture = this.personalData.ProfileImage;
            this.personalInformation.patchValue(Object.assign({}, this.personalData));


            console.log("FFFF", this.personalInformation.value)
        } else {
          this.personalData = [];
        }
      }
    )
  }


  save() {
    this.success = false;
    this.error = false;
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
          this.personalInformation.patchValue({
            ProfileImage: data.result
          })

          var dataToSubmit =  {
            UserId: this.id,
            Users: this.personalInformation.value
          }
          this.profileSevice.updatePersonalInformation(dataToSubmit)
          .subscribe(data => {
            if(data.status) {

              localStorage.setItem('user', JSON.stringify(data.result))

              this.success = true;
              this.error = false;
              // this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
              // this.bsModalRef.content.closeBtnName = 'Close';
            } else if(!data.status) {
              const initialState = {
                type: 'error'
              }
              this.error = true;
              this.success = false;
              // this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
              // this.bsModalRef.content.closeBtnName = 'Close';
              this.loading = false;
            }


          })
        } else if(!data.status){
          const initialState = {
            type: 'error'
          }
          this.success = false;
          this.error = true;
          this.loading = false;
          // this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
          // this.bsModalRef.content.closeBtnName = 'Close';
        }

      });
    } else {
      var dataToSubmit =  {
        UserId: this.id,
        Users: this.personalInformation.value
      }
      this.profileSevice.updatePersonalInformation(dataToSubmit)
      .subscribe(data => {
        if(data.status) {
          const initialState = {
            type: 'success',
            page: 'business-information',
            id: this.id
          }
          this.success = true;
          this.error = false;
          this.loading = false;
          console.log("sdasdasdasdas---> ",data.result)
          localStorage.setItem('user', JSON.stringify(data.result))
          // this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
          // this.bsModalRef.content.closeBtnName = 'Close';
        } else if(!data.status){
          const initialState = {
            type: 'error'
          }
          this.loading = false;
          this.success = false;
          this.error = true;
          // this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
          // this.bsModalRef.content.closeBtnName = 'Close';
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
                this.personalInformation.patchValue({
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

    goBack() {
      this.location.back();
    }



}
