import {
  Component,
  ViewChild,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile/profile.service';
import { JobService } from '../../services/job/job.service';
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { BsDaterangepickerDirective, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-post-a-job',
  templateUrl: './post-a-job.component.html',
  styleUrls: ['./post-a-job.component.scss']
})
export class PostAJobComponent implements OnInit {
  @ViewChild('dp') datepicker: BsDaterangepickerDirective;
  userInfo: any;
  jobInformation: FormGroup;
  industriesList: any=[];
  countriesList: any;
  regionList: any;
  personalData: any;
  mailingRegionList: any;
  loading: any;
  success: any;
  error: any;
  IsEquipmentPref:any    
  IsParticularDate:any;
  diliverables:any=[]; 
  bsConfig:any;
  selectLabel:any;
  OwnDeliverables1: any  =[];
  constructor(
    private formBuilder: FormBuilder,
    private profileSevice: ProfileService,
    private authService: AuthenticationService,
    private jobSevice:JobService

  ) {
  }

  ngOnInit() {
    this.OwnDeliverables1 = [{
      name: ''
    }]
    this.getCountriesList();
    this.getStatesByCode("",231,"")
    this.bsConfig = Object.assign({}, { containerClass: 'custom-datepicker' });
    this.selectLabel='abc'
    this.userInfo = this.authService.getCurrentUser();
    this.industriesList  = [
      {
        name: 'Construction'
      },
      {
        name: 'Telecom'
      },
      {
        name: 'Real Estate'
      },
      {
        name: 'Insurance'
      },
      {
        name: 'Utility'
      },
      {
        name: 'Agriculture'
      },
      {
        name: 'Law Enforcement and Security'
      },
      {
        name: 'Public Safety and Emergency Management'
      }
    ]
    
    this.jobInformation = this.formBuilder.group({
      UserId :[this.userInfo.ID],    
      IsQuote:[false], 
      JobTitle :[''],           
      Comments:[''],             
      Industry :[''],            
      Budget:[],              
      EquipmentPreferences:[''], 
      ExpectedDeliverables:[''], 
      OwnDeliverables :[''],     
      DateRanges: this.formBuilder.group({
        DateRangeID: [''],
        FromDate: [''],
        From: [''],
        To: [''],
        ToDate: [''],
      }),          
      AddressLine1:[''],         
      AddressLine2 :[''],        
      Country : 231,           
      City :[''],                
      State : [],               
      Zip:[''],                  
      PrimaryEmail :[''],        
      PrimaryPhone  :[''],       
      SecondaryPhone:[''],       
     
  });
  }

  setOptions() {
    this.datepicker.toggle();
  }
  save() {
    this.success = false;
    this.error = false;
    this.loading = true;
    this.jobInformation.value.Budget= parseFloat(this.jobInformation.value.Budget);
    this.jobInformation.value.Zip= this.jobInformation.value.Zip.toString();
    this.jobInformation.value.PrimaryPhone=this.jobInformation.value.PrimaryPhone.toString();
    this.jobInformation.value.SecondaryPhone=this.jobInformation.value.SecondaryPhone.toString();
    this.jobSevice.saveJobInformation(this.jobInformation.value)
    .subscribe(
      data => {
        if(data.status) {
          console.log("dskfbdsj",data)
        } else {
          
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

  getStatesByCode(type,code, value) {
    this.profileSevice.getStatesByCode(code)
    .subscribe(
      data => {
        if(data.status) {
          this.regionList = data.result;
          var temp = this.regionList[0]
          this.regionList[0] = this.regionList[9]
          this.regionList[9] = temp
          this.jobInformation.patchValue({
            State: this.regionList[0].ID
          })
          // this.regionList = data.Result;
        } else {
          // this.regionList = [];
        }
      }
    );
  }
}
