import { Component, OnInit, AfterViewInit, OnChanges, DoCheck, AfterContentChecked } from '@angular/core';
import { PilotService } from '../../../services/admin/pilots/pilots.service';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpParams } from '@angular/common/http';



@Component({
  selector: "app-pilot-list",
  templateUrl: "./pilot-list.component.html",
  styleUrls: ["./pilot-list.component.scss"]
})
export class PilotListComponent implements OnInit{

  paginationData: any = {}
  pageNumber: any = 10;
  maxSize = 5;
  bigTotalItems: any;
  bigCurrentPage = 1;
  pendingList: any;
  approvedList: any;
  isApprovedPilots: any = true;


 

  constructor(
    private pilotService: PilotService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }
  pilotList: any;
  search = [
    {
      name: "City"
    },
    {
      name: "State"
    },
    {
      name: "Country"
    },
    {
      name: "Zipcode"
    },
    {
      name: "Jobs"
    }
  ];



  ngOnInit() {
    // setTimeout(() => {
    //   var url_string = window.location.href;
    //   var url = new URL(url_string);
    //   var pageNo = parseInt(url.searchParams.get("page-no"));
    //   this.bigCurrentPage = parseInt(pageNo);
    // }, 500);

    //  var url_string = window.location.href;
    //   var url = new URL(url_string);
    //   var pageNo = parseInt(url.searchParams.get("page-no"));
      // this.bigCurrentPage = parseInt(pageNo);
    // if(pageNo) {
    //     var fromLimit = pageNo.toString() +'0'
    //     var data = {
    //       from: this.pageNumber, //skip
    //       to: parseInt(fromLimit) - 10 //limit
    //     }
    //     this.bigCurrentPage = pageNo;
    //     console.log("TTTTT", this.bigCurrentPage)
    //     console.log("aaaa", pageNo)
    //     this.getAllPilots(data.from, data.to);
    this.onPageLoad();
    // } else {
    //   console.log("Elseee")
      // this.getAllPilots(this.pageNumber, 0);
    // }

    // this.getAllPilots(this.pageNumber, 0);
    // this.getAllStates();
    // setTimeout(() => {
    //   this.getSpecificPilotsInit()
    // }, 500);
  }

  onPageLoad() {
    console.log("SDDDDD", this.isApprovedPilots)
    var fromLimit = this.bigCurrentPage.toString() +'0'

    var data = {
        from: this.pageNumber, //skip
        to: parseInt(fromLimit) - 10 //limit
    }
    if(this.isApprovedPilots) {
      this.bigCurrentPage = 1;
      this.pageNumber = 10;
      this.getAllApprovedPilots(data.from,data.to)
    } else {
      this.bigCurrentPage = 1;
      this.pageNumber = 10;
      this.getAllRejectedPilots(data.from, data.to)
    }
   
  }

  getAllRejectedPilots(num, val) {
    var data = { from: val, to: num };
    this.pilotService.getAllRejectedPilots(data).subscribe(data => {
      if (data.status) {
        this.pendingList = data.result;
        this.bigTotalItems = parseInt(data.totalRecord);
      } else if (!data.status) {
        this.pendingList = [];
        this.bigTotalItems = 0;
      }
    });
  }
  getAllApprovedPilots(num, val) {
    var data = { from: val, to: num };
    this.pilotService.getAllApprovedPilots(data).subscribe(data => {
      if (data.status) {
        this.approvedList = data.result;
        this.bigTotalItems = parseInt(data.totalRecord);
      } else if (!data.status) {
        this.approvedList = [];
        this.bigTotalItems = 0;
      }
    });
  }

  getAllStates() {
    this.pilotService.getAllStates().subscribe(data => {
      console.log("dd", data);
    });
  }

  getPilots(num, val) {
    this.getAllApprovedPilots(num, val);
  }

  openApprovedPilot() {
    this.isApprovedPilots = true;
    this.onPageLoad();
  }

  openPendingPilot() {
    this.isApprovedPilots = false;
    this.onPageLoad();
  }

  // getSpecificPilots() {
  //   this.router.navigate([], { queryParams: { 'page-no': this.bigCurrentPage }})
  //   setTimeout(() => {
  //     var fromLimit = this.bigCurrentPage.toString() +'0'
  //     var url_string = window.location.href;
  //     var url = new URL(url_string);
  //     var pageNo = url.searchParams.get("page-no");
  //     console.log("page Number:   ", url)
  //     var data = {
  //         from: this.pageNumber, //skip
  //         to: parseInt(fromLimit) - 10 //limit
  //     }
  //     this.getPilots(data.from,data.to)
  //   }, 100);

  // }


}
