import { Component, OnInit } from '@angular/core';
import { PilotService } from '../../../services/admin/pilots/pilots.service';
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpParams } from '@angular/common/http';


@Component({
  selector: "app-pilot-list",
  templateUrl: "./pilot-list.component.html",
  styleUrls: ["./pilot-list.component.scss"]
})
export class PilotListComponent implements OnInit {
  dtOptions: any;
  pageNumber: any = 10;
  maxSize = 5;
  bigTotalItems = 0;
  bigCurrentPage = 1;
  constructor(
    private pilotService: PilotService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
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
    console.log("FFFF")
    this.dtOptions = {
      pageLength: 10
    };
    this.getAllPilots(this.pageNumber, 0);
    this.getAllStates();
  }

  getAllPilots(num, val) {
    var data = { from: val, to: num };
    this.pilotService.getAllPilots(data).subscribe(data => {
      if (data.status) {
        this.pilotList = data.result;
        this.dtOptions = this.pilotList;
        this.bigTotalItems = data.totalRecord;
      } else if (!data.status) {
        this.pilotList = [];
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
    console.log(this.pageNumber)

    if (this.bigCurrentPage > 0) {
      this.router.navigate([], { queryParams: { 'page-no': this.bigCurrentPage })
      // changes the route without moving from the current view or
      // triggering a navigation event,
      // this.router.navigate(["/admin/pilot-list?token=324345345"]);
    }
    var fromLimit = this.bigCurrentPage.toString() +'0'
    var url_string = window.location.href;
    var url = new URL(url_string);
    var pageNo = url.searchParams.get("page-no");
    var data = {
      from: this.pageNumber, //skip
      to: parseInt(fromLimit) //limit
    }

    this.getPilots(data.from,data.to)
  }
}
