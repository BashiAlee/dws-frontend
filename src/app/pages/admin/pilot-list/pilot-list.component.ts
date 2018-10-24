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
  bigCurrentPage = 2;


 

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
  
    var fromLimit = this.bigCurrentPage.toString() +'0'
    this.bigCurrentPage = 2;

    var data = {
        from: this.pageNumber, //skip
        to: parseInt(fromLimit) - 10 //limit
    }
    this.getPilots(data.from,data.to)
  }

  getAllPilots(num, val) {
    var data = { from: val, to: num };
    this.pilotService.getAllPilots(data).subscribe(data => {
      if (data.status) {
        this.pilotList = data.result;
        this.bigTotalItems = parseInt(data.totalRecord);
      } else if (!data.status) {
        this.pilotList = [];
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
    this.getAllPilots(num, val);
  }

  getSpecificPilots() {
    this.router.navigate([], { queryParams: { 'page-no': this.bigCurrentPage }})
    setTimeout(() => {
      var fromLimit = this.bigCurrentPage.toString() +'0'
      var url_string = window.location.href;
      var url = new URL(url_string);
      var pageNo = url.searchParams.get("page-no");
      console.log("page Number:   ", url)
      var data = {
          from: this.pageNumber, //skip
          to: parseInt(fromLimit) - 10 //limit
      }
      this.getPilots(data.from,data.to)
    }, 100);

  }


}
