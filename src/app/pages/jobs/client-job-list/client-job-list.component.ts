import { AuthenticationService } from './../../../services/authentication/authentication.service';


import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../services/job/job.service';

@Component({
  selector: "app-client-job-list",
  templateUrl: "./client-job-list.component.html",
  styleUrls: ["./client-job-list.component.scss"]
})
export class ClientJobListComponent implements OnInit {
  userInfo: any;
  isActiveJobs: any = true;
  activeJobList: any = [];
  quotedJobList: any = [];
  paginationData: any = {};
  pageNumber: any = 10;
  maxSize = 5;
  bigTotalItems: any;
  bigCurrentPage = 1;
  constructor(
    private jobSevice: JobService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.onPageLoad();


  }
  openActiveJobs() {
    this.isActiveJobs = true;
    this.onPageLoad();
  }
  openQuotedJobs() {
    this.isActiveJobs = false;
    this.onPageLoad();
  }
  onPageLoad() {
    this.userInfo = this.authService.getCurrentUser();
    // console.log("user info,", this.userInfo);
    this.getUserActiveJobs(this.userInfo.ID);
    this.getUserQuotedJobs(this.userInfo.ID);

    var fromLimit = this.bigCurrentPage.toString() + "0";
    var data = {
      from: this.pageNumber, //skip //offsert
      to: parseInt(fromLimit) - 10 //limit
    };
    if (this.isActiveJobs) {
      this.bigCurrentPage = 1;
      this.pageNumber = 10;
    } else {
      this.bigCurrentPage = 1;
      this.pageNumber = 10;
    }
  }
  getUserActiveJobs(id) {
    this.jobSevice.getUserActiveJobs(id).subscribe(data => {
      // console.log("this is jobid,", data);

      if (data.status && data.result) {
        this.activeJobList = data.result;
      } else {
        this.activeJobList = [];
      }
    });
  }
  getUserQuotedJobs(id) {
    this.jobSevice.getUserQuotedJobs(id).subscribe(data => {
      // console.log("this is quoted,", data);
      if (data.status && data.result) {
        this.quotedJobList = data.result;
      } else {
        this.quotedJobList = [];
      }
    });
  }
}


