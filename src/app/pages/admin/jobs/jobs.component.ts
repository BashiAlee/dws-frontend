import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  isActiveJobs: any = true;
  paginationData: any = {};
  pageNumber: any = 10;
  maxSize = 5;
  bigTotalItems: any;
  bigCurrentPage = 1;
  constructor() { }

  ngOnInit() {
    this.onPageLoad();
    
  }
  openActiveJobs() {
    this.isActiveJobs = true;
    this.onPageLoad();
    console.log("akjcbskjcbk");
    
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
}
