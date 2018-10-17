import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalsComponent } from '../../../components/modals/modals.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { Croppie } from 'croppie/croppie';

import { CroppieDirective } from '../../../../angular-croppie-module/src/lib/croppie.directive';

declare var $: any;

@Component({
  selector: 'app-business-information',
  templateUrl: './business-information.component.html',
  styleUrls: ['./business-information.component.scss']
})
export class BusinessInformationComponent implements OnInit {
  bsModalRef: BsModalRef;
  selectedSuffix;
  businessData: any;
  physicalRegionList: any;
  businessImage: any;
  mailingRegionList: any;
  imageFile: any;
  countriesList: any;
  businessInformation: FormGroup;
  id:any;
  loading: any;
  displayPicture: any;
  messages: any = {};
  croppedImageData: any = {};
  imageChangedEvent: any;
  croppedImage: any;
  isAdmin: any;
  config = {
    class: "custom-modal modal-dialog-centered modal-md"
  };
  suffix = [
      { name: 'Jr.' },
      { name: 'Sr.' }
  ]

  businessTypes = [
    {
      name: 'Sole Proprietorship',
      code: 'SP'
    },
    {
      name: 'General Partnership',
      code: 'GP'
    },
    {
      name: 'Limited Partnership',
      code: 'LP'
    },
    {
      name: 'LLP',
      code: 'LLP'
    },
    {
      name: 'LLLP',
      code: 'LLLP'
    },
    {
      name: 'LLC',
      code: 'LLC'
    },
    {
      name: 'Corporation',
      code: 'C'
    },
    {
      name: 'S-Corporation',
      code: 'SC'
    },
    {
      name: 'Non-Profit',
      code: 'NP'
    }
  ];
  constructor(private formBuilder: FormBuilder, private router: Router,private profileSevice: ProfileService,private route: ActivatedRoute, private modalService: BsModalService, private authService: AuthenticationService) { 
    if(this.router.url.split('/')[1] =='admin') {
      this.isAdmin = true;
    }
    $('html, body').stop().animate({scrollTop: 0}, 500);   
  }

  ngOnInit() {
    // $('html,body').animate({
    //   scrollTop: $(".container").offset().top
    // },
    // 'slow');
   
    this.businessInformation = this.formBuilder.group({
      ID: [],
      PilotId: [],
      UserId: [this.id, Validators.required],
      BusinessName: [''],
      BusinessType: ['', Validators.required],
      PhysicallAddressLine1: ['', Validators.required],
      PhysicallAddressLine2: ['', Validators.required],
      PhysicallCountry: [''],
      PhysicallCity: [''],
      PhysicallState: ['', Validators.required],
      PhysicallZip: ['', Validators.required],
      SameAsPhysical: [0],
      MailingAddressLine1: ['', Validators.required],
      MailingAddressLine2: ['', Validators.required],
      MailingCountry: ['', Validators.required],
      MailingCity: [''],
      MailingState: ['', [Validators.required]],
      MailingZip: ['', Validators.required],
      BusinessPhoneNumberPrimary: [''],
      BusinessPhoneNumberSecondary: [''],
      StateRegisteredIn: [''],
      BusinessStartDate: [''],
      GeneralLiabilityInsurance: [0],
      ProfessionalLiabilityInsurance: [0],
      WorksmanCompInsurance: [0],
      CommercialAutoInsurance: [0],
      BusinessLogo: [''],
      Notes: ['']
      // password: ['', [Validators.required, Validators.minLength(6)]]
  });
    this.route.parent.url.subscribe((urlPath) => {
      this.id = parseInt(urlPath[1].path);
  })
    this.getCountriesList();
    this.getBusinessInfo(this.id)
  }

  get form() { return this.businessInformation.controls; }
  getBusinessInfo(id) {
    this.profileSevice.getProfileBusinessInfoByID(id)
    .subscribe(
      data => {
        if(data.status) {
            this.businessData = data.result;
            // this.getRegionByCode(this.businessData.m1Country);
            if(this.businessData.PhysicallCountry) {
              this.getStatesByCode('physical',this.businessData.PhysicallCountry,'onload')
            } 
            if(this.businessData.MailingCountry) {
              this.getStatesByCode('mailing',this.businessData.MailingCountry,'onload')
            }
            
            this.displayPicture = this.businessData.BusinessLogo;
            this.businessInformation.patchValue(Object.assign({}, this.businessData));

          

        } else {
          this.businessData = [];
        }
      }
    )
  }

  getStatesByCode(type,code, value) {
    if(value== 'change' && type == 'physical') {
      this.businessInformation.patchValue({
        PhysicallState: ''
      })
    }
    if(value== 'change' && type == 'mailing') {
      this.businessInformation.patchValue({
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

  uploadImage(file) {
      
    this.imageFile = file;
          if (file.target.files && file.target.files[0]) {
            var reader = new FileReader();
        
            reader.onload = (event:any) => {
              this.businessImage = event.target.result;
            }
        
            reader.readAsDataURL(file.target.files[0]);
          }

  }

  cloneValues(value) {

      this.businessInformation.patchValue({
        MailingAddressLine1: '',
        MailingAddressLine2: '',
        MailingCity: '',
        MailingState: '',
        MailingCountry: '',
        MailingZip: ''
      })
    }
    zoomPic(url) {
      console.log("DFDDDD", url)
      var initialState  = {
        data: url,
        type: 'zoom-admin'
      };
      var config  = {
        class: 'custom-modal modal-dialog-centered modal-lg'
      }
      this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
    
  }

    save() {
      this.loading = true;
      // console.log(this.personalInformation.value)
      //   this.bsModalRef = this.modalService.show(ModalsComponent,this.config);
      //     this.bsModalRef.content.closeBtnName = 'Close';
      this.businessInformation.patchValue({
        UserId : parseInt(this.id)
      })
      if(this.businessInformation.value.SameAsPhysical) {
        this.businessInformation.patchValue({
          SameAsPhysical : '1'
        })
      } else {
        this.businessInformation.patchValue({
          SameAsPhysical : '0'
        })
      }


      // this.businessInformation.value.GeneralLiabilityInsurance = this.businessInformation.value.GeneralLiabilityInsurance.toString()
      // this.businessInformation.value.ProfessionalLiabilityInsurance = this.businessInformation.value.ProfessionalLiabilityInsurance.toString()
      // this.businessInformation.value.WorksmanCompInsurance = this.businessInformation.value.WorksmanCompInsurance.toString()
      // this.businessInformation.value.CommercialAutoInsurance = this.businessInformation.value.CommercialAutoInsurance.toString()
      // this.businessInformation.value.BusinessPhoneNumberPrimary = this.businessInformation.value.BusinessPhoneNumberPrimary.toString();
      // this.businessInformation.value.BusinessPhoneNumberSecondary = this.businessInformation.value.BusinessPhoneNumberSecondary.toString();
      if(this.imageFile) {
        this.profileSevice.uploadProfilePicture(this.imageFile)
        .subscribe(data => {
          if(data.status) {
            this.businessInformation.patchValue({
              BusinessLogo: data.result
            })
            this.profileSevice.updateBusinessInformation(this.businessInformation.value)
            .subscribe(data => {
              if(data.status) {
                const initialState = {
                  type: 'success',
                  page: 'equipment',
                  id: this.id
                }
                this.loading = false;
                this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
                this.bsModalRef.content.closeBtnName = 'Close';
              } else if(!data.status) {
                const initialState = {
                  type: 'error'
                }
                this.loading = false;
                this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
                this.bsModalRef.content.closeBtnName = 'Close';
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
        this.profileSevice.updateBusinessInformation(this.businessInformation.value)
        .subscribe(data => {
            if(data.status) {
              const initialState = {
                type: 'success',
                page: 'equipment',
                id: this.id
              }
              this.loading = false;
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
                this.businessInformation.patchValue({
                  BusinessLogo: data.result
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
    
    
  

}
