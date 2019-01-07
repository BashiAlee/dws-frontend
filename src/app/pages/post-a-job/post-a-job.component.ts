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
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalsComponent } from '../../components/modals/modals.component';
import { Router, ActivatedRoute } from "@angular/router";

import * as _ from 'lodash';
@Component({
  selector: "app-post-a-job",
  templateUrl: "./post-a-job.component.html",
  styleUrls: ["./post-a-job.component.scss"]
})
export class PostAJobComponent implements OnInit {
  @ViewChild("dp1") datepicker: BsDaterangepickerDirective;
  @ViewChild("dp2") datepicker2: BsDaterangepickerDirective;
  @ViewChild("dp3") datepicker3: BsDaterangepickerDirective;
  userInfo: any;
  bsModalRef: BsModalRef;
  jobInformation: FormGroup;
  industriesList: any = [];
  countriesList: any;
  regionList: any;
  jobData: any;
  mailingRegionList: any;
  loading: any;
  success: any;
  error: any;
  IsEquipmentPref: any;
  IsParticularDate: any;
  diliverables: any = [];
  bsConfig: any;
  selectLabel: any;
  OwnDeliverables1: any = [];
  tagsArray: any = [];
  isParticular: any = [];
  jobId: any;
  isAdmin: any;
  adminId: any;
  jobStatusArray: any = {};

  config = {
    class: "custom-modal modal-dialog-centered modal-md successModal"
  };
  expectedDeliverables: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private profileSevice: ProfileService,
    private authService: AuthenticationService,
    private jobSevice: JobService,
    private modalService: BsModalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.router.url.split("/")[1] == "admin") {
      this.isAdmin = true;
    }
  }

  ngOnInit() {
    this.jobId = this.route.snapshot.paramMap.get("id");
    this.OwnDeliverables1 = [
      {
        name: ""
      }
    ];
    this.expectedDeliverables = [
      {
        name: "Raw Footage"
      },
      {
        name: "JPEGS"
      },
      {
        name: "RAW Images"
      },
      {
        name: "Edited Images"
      }
    ];
    this.getJobByID(this.jobId);
    this.getCountriesList();
    this.getStatesByCode("", 231, "");
    this.bsConfig = Object.assign({}, { containerClass: "custom-datepicker" });
    this.selectLabel = "abc";
    if (this.isAdmin) {
      this.userInfo = this.authService.getCurrentAdmin();
    } else {
      this.userInfo = this.authService.getCurrentUser();
    }
    this.industriesList = [
      {
        name: "Construction"
      },
      {
        name: "Telecom"
      },
      {
        name: "Real Estate"
      },
      {
        name: "Insurance"
      },
      {
        name: "Utility"
      },
      {
        name: "Agriculture"
      },
      {
        name: "Law Enforcement and Security"
      },
      {
        name: "Public Safety and Emergency Management"
      }
    ];

    this.jobInformation = this.formBuilder.group({
      UserId: [this.userInfo.ID],
      IsQuote: [false],
      JobTitle: [""],
      Comments: [""],
      Industry: [null],
      Budget: [],
      EquipmentPreferences: [""],
      ExpectedDeliverables: [null],
      OwnDeliverables: [""],
      DateRanges: this.formBuilder.group({
        DateRangeID: [""],
        FromDate: [""],
        From: [""],
        To: [""],
        ToDate: [""]
      }),
      AddressLine1: [""],
      AddressLine2: [""],
      Country: 231,
      City: [""],
      State: [],
      Zip: [""],
      PrimaryEmail: [""],
      PrimaryPhone: [""],
      SecondaryPhone: [""],
      ParticularData: this.formBuilder.array([])
    });
  }

  setOptions(value) {
    if (value == "1") {
      this.datepicker.toggle();
    }
    if (value == "2") {
      this.datepicker2.toggle();
    }
    if (value == "3") {
      this.datepicker3.toggle();
    }
  }
  changeJobStatus(status) {
    this.jobStatusArray = {
      JobId: this.jobData.JobId,
      Status: status
    };
    // console.log("this is ",this.jobStatusArray);
    this.jobSevice.jobStatus(this.jobStatusArray).subscribe(data => {
      console.log("this is data",data);

    });
  }

  getJobByID(jobId) {
    this.jobSevice.getJobByID(jobId).subscribe(data => {
      console.log("data of jobs", data);

      if (data.status) {
        this.jobData = data.result[0];
        if (
          this.jobData.DateRanges.FromDate != "" &&
          this.jobData.DateRanges.From != "" &&
          this.jobData.DateRanges.To != ""
        ) {
          this.jobData.DateRanges.FromDate = new Date(
            this.jobData.DateRanges.FromDate
          );
        }
        if (
          this.jobData.DateRanges.FromDate != "" &&
          this.jobData.DateRanges.ToDate != ""
        ) {
          this.jobData.DateRanges.FromDate = new Date(
            this.jobData.DateRanges.FromDate
          );
          this.jobData.DateRanges.ToDate = new Date(
            this.jobData.DateRanges.ToDate
          );
        }
        this.jobInformation.patchValue(Object.assign({}, this.jobData));
        if (this.jobInformation.value.EquipmentPreferences != "") {
          this.IsEquipmentPref = "yes";
        }
        if (
          this.jobInformation.value.DateRanges.FromDate != "" &&
          this.jobInformation.value.DateRanges.From != "" &&
          this.jobInformation.value.DateRanges.To != ""
        ) {
          this.IsParticularDate = "particular";
        }
        if (
          this.jobInformation.value.DateRanges.FromDate != "" &&
          this.jobInformation.value.DateRanges.ToDate != ""
        ) {
          this.IsParticularDate = "range";
        }
        if (this.jobInformation.value.ParticularData != null) {
          const control = <FormArray>(
            this.jobInformation.controls["ParticularData"]
          );

          this.jobData.ParticularData.forEach(value => {
            const addrCtrl = this.formBuilder.group({
              ParticularName: [value.ParticularName],
              ParticularNumber: [value.ParticularNumber]
            });
            control.push(addrCtrl);
          });
        }
      } else {
        this.jobData = [];
      }
    });
  }
  save() {
    // this.success = false;
    // this.error = false;
    // this.loading = true;
    this.jobInformation.value.Budget = parseFloat(
      this.jobInformation.value.Budget
    );
    this.jobInformation.value.Zip = this.jobInformation.value.Zip.toString();
    this.jobInformation.value.PrimaryPhone = this.jobInformation.value.PrimaryPhone.toString();
    this.jobInformation.value.SecondaryPhone = this.jobInformation.value.SecondaryPhone.toString();
    this.jobSevice
      .saveJobInformation(this.jobInformation.value)
      .subscribe(data => {
        if (data.status) {
          const initialState = {
            type: "success"
          };
          this.bsModalRef = this.modalService.show(
            ModalsComponent,
            Object.assign({}, this.config, { initialState })
          );
          this.bsModalRef.content.closeBtnName = "Close";
        } else {
          // this.loading = false;
          // this.success = false;
          // this.error = true;
          const initialState = {
            type: "error"
          };
          this.bsModalRef = this.modalService.show(
            ModalsComponent,
            Object.assign({}, this.config, { initialState })
          );
          this.bsModalRef.content.closeBtnName = "Close";
        }
      });
  }
  getCountriesList() {
    this.profileSevice.getCountries().subscribe(data => {
      if (data.status) {
        this.countriesList = data.result;
      } else {
        this.countriesList = [];
      }
    });
  }

  getStatesByCode(type, code, value) {
    this.profileSevice.getStatesByCode(code).subscribe(data => {
      if (data.status) {
        this.regionList = data.result;
        this.jobInformation.patchValue({
          State: this.regionList[0].ID
        });
        // this.regionList = data.Result;
      } else {
        // this.regionList = [];
      }
    });
  }

  addToTagList(value) {
    if (value) {
      var x = value.split(",");
      x.forEach((value, index) => {
        if (value) {
          this.tagsArray[index] = value;
        } else {
          this.tagsArray.splice(index, 1);
        }
      });
    } else {
      this.tagsArray = [];
    }
    var x = _.reject(this.tagsArray, _.isEmpty);
    this.tagsArray = x;
  }
  addParticularData() {
    const control = <FormArray>this.jobInformation.controls["ParticularData"];
    const addrCtrl = this.formBuilder.group({
      ParticularName: [""],
      ParticularNumber: []
    });
    control.push(addrCtrl);
  }

  removeParticularData(index) {
    let control = <FormArray>this.jobInformation.controls.ParticularData;
    control.removeAt(index);
    //.removeAt(this.images.value.findIndex(image => image.id === 502))
  }
}
