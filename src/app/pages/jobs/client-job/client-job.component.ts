import { Component, ViewChild, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from "@angular/forms";
import { ProfileService } from "../../../services/profile/profile.service";
import { JobService } from "../../../services/job/job.service";
import { AuthenticationService } from "../../../services/authentication/authentication.service";
import {
  BsDaterangepickerDirective,
  BsDatepickerConfig
} from "ngx-bootstrap/datepicker";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { BsModalService } from "ngx-bootstrap/modal";
import { ModalsComponent } from "../../../components/modals/modals.component";
import { Router, ActivatedRoute } from "@angular/router";
import { PilotService } from "../../../services/admin/pilots/pilots.service";
import * as moment from "moment";

import * as _ from "lodash";
import { forEach } from "@angular/router/src/utils/collection";
@Component({
  selector: "app-client-job",
  templateUrl: "./client-job.component.html",
  styleUrls: ["./client-job.component.scss"]
})
export class ClientJobComponent implements OnInit {
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
  isYou: any;
  adminId: any;
  jobStatusArray: any = {};

  isJobRequest: any = true;
  activeJobList: any = [];
  quotedJobList: any = [];
  assignedPilotList: any;
  loaders: any = {};
  remainingDays: any = 0;
  remainingTime:any=0;
  pilotData:any={}

  paginationData: any = {};
  pageNumber: any = 10;
  maxSize = 5;
  bigTotalItems: any;
  bigCurrentPage = 1;
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
    private pilotService: PilotService,
    private router: Router
  ) {
    if (this.router.url.split("/")[1] == "admin") {
      this.isAdmin = true;
    }
  }

  ngOnInit() {
    this.onPageLoad();

    this.jobId = this.route.snapshot.paramMap.get("id");
    console.log("this is data from component", this.jobId);

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
      JobTitle: ["", Validators.required],
      Comments: ["", Validators.required],
      Industry: [null],
      Budget: [Validators.required],
      EquipmentPreferences: [""],
      ExpectedDeliverables: [null, Validators.required],
      OwnDeliverables: ["", Validators.required],
      DateRanges: this.formBuilder.group({
        DateRangeID: [""],
        FromDate: [""],
        From: [""],
        To: [""],
        ToDate: [""]
      }),
      AddressLine1: ["", Validators.required],
      AddressLine2: ["", Validators.required],
      Country: 231,
      City: ["", Validators.required],
      State: [Validators.required],
      Zip: ["", Validators.required],
      PrimaryEmail: ["", Validators.required],
      PrimaryPhone: ["", Validators.required],
      SecondaryPhone: ["", Validators.required],
      ParticularData: this.formBuilder.array([]),
      JobStartingTime:[""]
    });
  }
  JobRequest() {
    this.isJobRequest = true;
    this.onPageLoad();
  }
  AssignPilots() {
    this.isJobRequest = false;
    this.onPageLoad();
  }
  onPageLoad() {
    var fromLimit = this.bigCurrentPage.toString() + "0";
    var data = {
      from: this.pageNumber, //skip //offsert
      to: parseInt(fromLimit) - 10 //limit
    };
    if (this.isJobRequest) {
      this.bigCurrentPage = 1;
      this.pageNumber = 10;
      // this.getActiveJobs(data.from, data.to);
    } else {
      this.bigCurrentPage = 1;
      this.pageNumber = 10;
      this.getAssignPolitList(this.jobId);
    }
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
  openRatingModal() {
    const initialState = { type: "pilotRating" };
    this.bsModalRef = this.modalService.show(
      ModalsComponent,
      Object.assign({}, this.config, { initialState })
    );
    this.bsModalRef.content.closeBtnName = "Close";
    this.loaders.approveProfile = false;
  }
  approveJob() {
    this.jobStatusArray = {
      JobId: this.jobData.JobId,
      Status: "active",
      IsQuote: false
    };
    this.loaders.approveProfile = true;
    const initialState = { type: "jobApproved" };
    this.jobSevice.jobStatus(this.jobStatusArray).subscribe(data => {
      if (data.status) {
        this.bsModalRef = this.modalService.show(
          ModalsComponent,
          Object.assign({}, this.config, { initialState })
        );
        this.bsModalRef.content.closeBtnName = "Close";
        this.loaders.approveProfile = false;
      }
    });
  }
  changeJobStatus() {
    this.jobStatusArray = {
      PilotId:this.userInfo.ID,
      JobId: this.jobData.JobId,
      Status: "completed",
      JobCompletionTime:moment().format("MMM Do YY"),
    };
    this.loaders.approveProfile = true;
    const initialState = { type: "jobCompleted" };
    this.jobSevice.jobStatus(this.jobStatusArray).subscribe(data => {
      if (data.status) {
        this.bsModalRef = this.modalService.show(
          ModalsComponent,
          Object.assign({}, this.config, { initialState })
        );
        this.bsModalRef.content.closeBtnName = "Close";
        this.loaders.approveProfile = false;
      }
    });
  }
  rejectJob() {
    this.jobStatusArray = {
      JobId: this.jobData.JobId,
      Status: "archived"
    };
    this.loaders.approveProfile = true;
    const initialState = { type: "jobReject" };

    this.jobSevice.jobStatus(this.jobStatusArray).subscribe(data => {
      if (data.status) {
        this.bsModalRef = this.modalService.show(
          ModalsComponent,
          Object.assign({}, this.config, { initialState })
        );
        this.bsModalRef.content.closeBtnName = "Close";
        this.loaders.approveProfile = false;
      }
    });
  }
  getAssignPolitList(jobId) {
    this.isYou = false;
    this.jobSevice.getAssignPolits(jobId).subscribe(data => {
      if (data.status && data.result) {
        this.assignedPilotList = data.result;
        this.bigTotalItems = parseInt(data.totalRecord);
      } else {
        this.assignedPilotList = [];
        this.bigTotalItems = 0;
      }
    });
  }
  getJobByID(jobId) {
    this.jobSevice.getJobByID(jobId).subscribe(data => {
      if (data.status) {

        this.jobData = data.result;
        console.log("this is data", this.jobData);
        if (this.jobData.DateRanges.FromDate != "" && this.jobData.DateRanges.From != "" && this.jobData.DateRanges.To != "") {
          this.jobData.DateRanges.FromDate = new Date(
            this.jobData.DateRanges.FromDate
          );
        }
        else{
          this.jobData.DateRanges.FromDate = new Date(
            this.jobData.DateRanges.FromDate
          );
          this.jobData.DateRanges.ToDate = new Date(
            this.jobData.DateRanges.ToDate
          );
          }

        // a.diff(b, "days");

        this.jobInformation.patchValue(Object.assign({}, this.jobData));
        this.jobInformation.patchValue({
          ExpectedDeliverables: this.jobData.ExpectedDeliverables.split(
            ","
          )
        });

        if (this.jobInformation.value.EquipmentPreferences != "") {
          this.IsEquipmentPref = "yes";
        }
        if (
          this.jobInformation.value.DateRanges.FromDate != "" &&
          this.jobInformation.value.DateRanges.From != "" &&
          this.jobInformation.value.DateRanges.To != ""
        ) {
            this.IsParticularDate = "particular";
            var endTime = new Date(this.jobInformation.value.DateRanges.To).getTime();
            var now = new Date().getTime();
            var distance = endTime - now;
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            this.remainingTime = hours + "h " + minutes + "m " + seconds + "s "
            // this.remainingTime = moment(endTime).calendar();
          }
        if (
          this.jobInformation.value.DateRanges.FromDate != "" &&
          this.jobInformation.value.DateRanges.ToDate != ""
        ) {
          this.IsParticularDate = "range";
          var endDate = new Date(this.jobInformation.value.DateRanges.ToDate).getTime();
          var now1 = new Date().getTime();
          var distance = endDate - now1;
          // var timeDiff = Math.abs(now1.getTime() - endDate.getTime());
          this.remainingDays = Math.floor(distance / (1000 * 60 * 60 * 24));
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

          this.jobData.PilotIds.forEach(val => {
            if (val.PilotId==this.userInfo.ID){
              this.pilotData=val;
            }

          });
          console.log("this is bibik ta", this.pilotData);

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
    this.jobInformation.value.ExpectedDeliverables = this.jobInformation.value.ExpectedDeliverables.toString();
    this.jobInformation.value.Zip = this.jobInformation.value.Zip.toString();
    this.jobInformation.value.PrimaryPhone = this.jobInformation.value.PrimaryPhone.toString();
    this.jobInformation.value.SecondaryPhone = this.jobInformation.value.SecondaryPhone.toString();
    // console.log("job Data", this.jobInformation.value);s
    if (this.jobInformation.value.DateRanges.FromDate != "" && this.jobInformation.value.DateRanges.From != "" && this.jobInformation.value.DateRanges.To != "") {
      this.jobInformation.value.DateRanges.FromDate = moment(this.jobInformation.value.DateRanges.FromDate).format("ll");
      this.jobInformation.value.DateRanges.From = moment(this.jobInformation.value.DateRanges.From).format("lll");
      this.jobInformation.value.DateRanges.To = moment(this.jobInformation.value.DateRanges.To).format("lll");
    }else{
      this.jobInformation.value.DateRanges.FromDate = moment(this.jobInformation.value.DateRanges.FromDate).format("ll");
      this.jobInformation.value.DateRanges.ToDate = moment(this.jobInformation.value.DateRanges.ToDate).format("ll");
    }



    // console.log("data of jobs", this.jobInformation.value);

    this.jobSevice.saveJobInformation(this.jobInformation.value)
      .subscribe(data => {
        if (data.status) {
          var initialState = {};
          if (this.jobInformation.value.IsQuote) {
            initialState = {
              type: "jobPosted"
              // type: "warning"
            };
          } else {
            initialState = {
              type: "jobPostedLive"
              // type: "warning"
            };
          }

          this.bsModalRef = this.modalService.show(
            ModalsComponent,
            Object.assign({}, this.config, { initialState })
          );
          this.bsModalRef.content.closeBtnName = "Close";
        } else {
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
      ParticularName: ["", Validators.required],
      ParticularNumber: [Validators.required]
    });
    control.push(addrCtrl);
  }

  removeParticularData(index) {
    let control = <FormArray>this.jobInformation.controls.ParticularData;
    control.removeAt(index);
    //.removeAt(this.images.value.findIndex(image => image.id === 502))
  }

  get form() {
    return this.jobInformation.controls;
  }
}
