import {
  Component,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  BsModalService
} from 'ngx-bootstrap/modal';
import {
  BsModalRef
} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  ProfileService
} from '../../../services/profile/profile.service';
import {
  ActivatedRoute, Router
} from '@angular/router';
import {
  AuthenticationService
} from '../../../services/authentication/authentication.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalsComponent } from '../../../components/modals/modals.component';

declare var $: any;
@Component({
  selector: 'app-document-declaration',
  templateUrl: './document-declaration.component.html',
  styleUrls: ['./document-declaration.component.scss']
})
export class DocumentDeclarationComponent implements OnInit {
  selectedSuffix;
  bsModalRef: BsModalRef;
  selectedWaivers: any;
  documentInformation: FormGroup;
  documentData: any;
  isLiabilityInsurance: any;
  licenseFile: any;
  licenseImage: any;
  images:any =  {};
  loading: any;
  config = {
    class: "custom-modal modal-dialog-centered modal-md"
  };
  id: any;
  isAdmin: any;
  suffix = [{
      name: 'Jr.'
    },
    {
      name: 'Sr.'
    }
  ]
  waiversList = [{
      WaiversCurrentlyHeld: '107.27',
      code: '1'
    },
    {
      WaiversCurrentlyHeld: '107.29',
      code: '2'
    },
    {
      WaiversCurrentlyHeld: '107.31',
      code: '3'
    },
    {
      WaiversCurrentlyHeld: '107.33',
      code: '4'
    },
    {
      WaiversCurrentlyHeld: '107.35',
      code: '5'
    },
    {
      WaiversCurrentlyHeld: '107.37(a)',
      code: '6'
    },
    {
      WaiversCurrentlyHeld: '107.39',
      code: '7'
    },
    {
      WaiversCurrentlyHeld: '107.51',
      code: '8'
    },
  ];
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private profileService: ProfileService, private modalService: BsModalService, private router: Router, private authService: AuthenticationService,private sanitize: DomSanitizer) {
    this.documentInformation = this.formBuilder.group({
      Veteran: [0],
      Agrement: [0],
      AviationLiabilityInsurance: [0],
      DriversLisenceImage: [],
      ID: [],
      Notes: [],
      PilotCertificateImage: [],
      UserId: [],
      PilotId: [],
      RecurrentExamPdf: [],
      AviationLiabilityInsurancePdf: [],
      CopyOfAviationLiabilityInsurancePdf: []

    });

    this.route.parent.url.subscribe((urlPath) => {
      this.id = parseInt(urlPath[1].path);
    })

    this.getDocumentDeclarationDataByID(this.id)
    this.getWaiversByID(this.id);
    if(this.router.url.split('/')[1] =='admin') {
      this.isAdmin = true;
    }
  }

  ngOnInit() {}

  getDocumentDeclarationDataByID(id) {
    this.profileService.getProfileDocumentsByID(id)
      .subscribe(
        data => {
          if (data.status) {
            this.documentData = data.result;
            // this.licenseImage = this.documentData.DriversLisenceImage;
            // this.documentData.Veteran =  this.documentData.Veteran == 'true';
            // this.documentData.AviationLiabilityInsurance =  this.documentData.AviationLiabilityInsurance == 'true';
            // this.documentData.Agrement = this.documentData.Agrement == 'true';

            this.images.PilotCertificateImage = this.documentData.PilotCertificateImage;
            this.images.RecurrentExamPdf = this.documentData.RecurrentExamPdf;
            this.images.AviationLiabilityInsurancePdf = this.documentData.AviationLiabilityInsurancePdf;
            this.images.CopyOfAviationLiabilityInsurancePdf = this.documentData.CopyOfAviationLiabilityInsurancePdf;
            this.licenseImage = this.documentData.DriversLisenceImage;
            this.documentInformation.patchValue(Object.assign({}, this.documentData));
            this.documentInformation.patchValue({
              UserId: this.id
            })
          }
        }
      );
  }
  openModal(template: TemplateRef < any > ) {
    this.bsModalRef = this.modalService.show(
      template,
      Object.assign({}, {
        class: 'modal-lg'
      })
    );
  }
  getWaiversByID(id) {
    var test = [];
    this.profileService.getDocumentsWaiversByID(id)
      .subscribe(
        data => {
          if (data.status) {
            if (data.result && data.result.length) {
              data.result.forEach(value => {
                test.push(value.WaiversCurrentlyHeld)
              });
            }

            this.selectedWaivers = test;
          }
        }
      )
  }

  addWaiver() {
    var data = {
      UserId: this.id,
      PilotId: this.documentData.PilotId,
      WaiversCurrentlyHeld: this.selectedWaivers
    }

    this.profileService.addWaiver(data)
      .subscribe(
        data => {}
      )
  }


  uploadPDF(file) {

    this.profileService.uploadProfilePicture(file)
      .subscribe(
        data => {
          console.log("DDD", data)
        }
      )
  }

  updateDocuments() {
    this.loading = true;
    this.addWaiver();
    if (this.documentInformation.value.Agrement) {
      console.log("FFFf", this.documentInformation.value)
      this.documentInformation.patchValue({
        Agrement: '1'
      })
      console.log("FFFdasdasdf", this.documentInformation.value)
    } else {
      this.documentInformation.patchValue({
        Agrement: '0'
      })
    }
    this.documentInformation.patchValue({
      UserId: this.id
    })

    // this.documentInformation.value.Veteran = this.documentInformation.value.Veteran.toString();
    // this.documentInformation.value.AviationLiabilityInsurance = this.documentInformation.value.AviationLiabilityInsurance.toString();
    // this.documentInformation.value.Agrement = this.documentInformation.value.Agrement.toString();
    this.profileService.updateDocumentation(this.documentInformation.value)
      .subscribe(
        data => {
          if(data.status) {
            this.loading = false;
            const initialState = {
              type: 'success',
              page: '',
              id: ''
            }
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
        }
      )

  }
  uploadImage(file, type) {
    if (type == 'license') {
      this.licenseFile = file;
      if (file.target.files && file.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.licenseImage = event.target.result;
        }
        reader.readAsDataURL(file.target.files[0]);
      }
      this.profileService.uploadProfilePicture(this.licenseFile)
        .subscribe(
          data => {
            if (data.status) {
              this.documentInformation.patchValue({
                DriversLisenceImage: data.result
              })
            }
          }
        )
    }

    if(type =='pilot-certificate'){

      if (file.target.files && file.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.PilotCertificateImage = event.target.result;
        }
        reader.readAsDataURL(file.target.files[0]);
      }
      this.profileService.uploadProfilePicture(file)
        .subscribe(
          data => {
            if (data.status) {
              this.documentInformation.patchValue({
                PilotCertificateImage: data.result
              })
            }
          }
        )
    }
    if(type =='exam'){
      
      if (file.target.files && file.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.RecurrentExamPdf = event.target.result;
        }
        reader.readAsDataURL(file.target.files[0]);
      }
      this.profileService.uploadProfilePicture(file)
        .subscribe(
          data => {
            if (data.status) {
              this.documentInformation.patchValue({
                RecurrentExamPdf: data.result
              })
            }
          }
        )
    }
    if(type =='liability-certificate'){
      if (file.target.files  && file.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.AviationLiabilityInsurancePdf = event.target.result;
        }
        reader.readAsDataURL(file.target.files[0]);
      }
      this.profileService.uploadProfilePicture(file)
        .subscribe(
          data => {
            if (data.status) {
              this.documentInformation.patchValue({
                AviationLiabilityInsurancePdf: data.result
              })
            }
          }
        )
    }
    if(type =='copy-liability-certificate'){
      if (file.target.files && file.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.CopyOfAviationLiabilityInsurancePdf = event.target.result;
        }
        reader.readAsDataURL(file.target.files[0]);
      }
      this.profileService.uploadProfilePicture(file)
        .subscribe(
          data => {
            if (data.status) {
              this.documentInformation.patchValue({
                CopyOfAviationLiabilityInsurancePdf: data.result
              })
            }
          }
        )
    }
  }

  choosePDFFile(file) {

    if (file.target.files && file.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        console.log("asdasdasdsad", event.target.result);
      }
      reader.readAsDataURL(file.target.files[0]);
      // this.messages.uploadingImage = false;
    }
  }



}
