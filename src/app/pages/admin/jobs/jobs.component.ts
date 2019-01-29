import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../services/job/job.service';

@Component({
  selector: "app-jobs",
  templateUrl: "./jobs.component.html",
  styleUrls: ["./jobs.component.scss"]
})
export class JobsComponent implements OnInit {
  isActiveJobs: any = true;
  activeJobList: any = [];
  quotedJobList: any = [];
  pageNumber: any = 10;
  maxSize = 5;
  bigTotalItems: any;
  bigCurrentPage = 1;
  constructor(private jobSevice: JobService) {}

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
    var fromLimit = this.bigCurrentPage.toString() + "0";
    var data = {
      from: this.pageNumber, //skip //offsert
      to: parseInt(fromLimit) - 10 //limit
    };
    if (this.isActiveJobs) {
      this.bigCurrentPage = 1;
      this.pageNumber = 10;
      this.getActiveJobs(data.from, data.to);
    } else {
      this.bigCurrentPage = 1;
      this.pageNumber = 10;
      this.getQuotedJobs(data.from, data.to);
    }
  }
  getActiveJobs(num, val) {
    var data = { from: val, to: num };
    this.jobSevice.getActiveJobs(data).subscribe(data => {
      if (data.status && data.result) {
        this.activeJobList = data.result;
      } else {
        this.activeJobList = [];
      }
    });
  }
  getQuotedJobs(num, val) {
    var data = { from: val, to: num };
    this.jobSevice.getQuotedJobs(data).subscribe(data => {
      if (data.status && data.result) {
        this.quotedJobList = data.result;
      } else {
        this.quotedJobList = [];
      }
    });
  }
}


