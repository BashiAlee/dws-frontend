import {
  Component,
  ViewChild,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ProfileService } from '../../services/profile/profile.service';
import { JobService } from '../../services/job/job.service';
import { AuthenticationService } from "../../services/authentication/authentication.service";
import { BsDaterangepickerDirective, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

import * as _ from 'lodash';
@Component({
  selector: 'app-post-a-job',
  templateUrl: './post-a-job.component.html',
  styleUrls: ['./post-a-job.component.scss']
})
export class PostAJobComponent implements OnInit {
  @ViewChild('dp1') datepicker: BsDaterangepickerDirective;
  @ViewChild('dp2') datepicker2: BsDaterangepickerDirective;
  @ViewChild('dp3') datepicker3: BsDaterangepickerDirective;
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
  tagsArray: any = [];
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
      ParticularData: this.formBuilder.array([]),       
     
  });
  }

  setOptions(value) {
    if(value=='1'){
      this.datepicker.toggle();
    }
    if(value=='2'){
      this.datepicker2.toggle();
    }
    if(value=='3'){
      this.datepicker3.toggle();
    }
    
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

  addToTagList(value) {
   
    if(value) {
      var x = value.split(',');
      x.forEach((value,index) => {
        if(value) {
          this.tagsArray[index] = value
        } else {
          this.tagsArray.splice(index,1);
        }
       
      });
    } else {
      this.tagsArray = [];
    }
    var x = _.reject(this.tagsArray, _.isEmpty);
   this.tagsArray = x;
   
  }
  addParticularData() {
    const control = < FormArray > this.jobInformation.controls['ParticularData'];
    const addrCtrl = this.formBuilder.group({
      Name: [''],
      Number: ['']
    });
    control.push(addrCtrl);
  }

  removeParticularData(index){
    let control = <FormArray>this.jobInformation.controls.ParticularData;
    control.removeAt(index)
    //.removeAt(this.images.value.findIndex(image => image.id === 502))
  }
}
