import { Component, OnInit } from '@angular/core';
import { JobService } from '../../../services/job/job.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  isActiveJobs: any = true;
  activeJobList:any=[];
  quotedJobList:any=[];
  paginationData: any = {};
  pageNumber: any = 10;
  maxSize = 5;
  bigTotalItems: any;
  bigCurrentPage = 1;
  constructor(
    private jobSevice:JobService


  ) { }

  ngOnInit() {
    this.onPageLoad();
    this.getAllJobs()
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
      // this.getAllApprovedPilots(data.from, data.to);
    } else {
      this.bigCurrentPage = 1;
      this.pageNumber = 10;
      // this.getAllRejectedPilots(data.from, data.to);
    }
  }
  getAllJobs() {
    this.jobSevice.getAllJobs()
    .subscribe(
      data => {
        if (data.status && data.result) {
          data.result.forEach(value => {
            if (!value.IsQuote){
              this.activeJobList.push(value)
            }else{
              this.quotedJobList.push(value)
            }
          });
        } else  {
          this.activeJobList = [];
          this.quotedJobList = [];
        }
      }
    );
  }
}


