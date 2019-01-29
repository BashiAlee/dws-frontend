import { PilotService } from './../../../services/admin/pilots/pilots.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-client-list",
  templateUrl: "./client-list.component.html",
  styleUrls: ["./client-list.component.scss"]
})
export class ClientListComponent implements OnInit {
  pageNumber: any = 10;
  maxSize = 5;
  bigTotalItems: any;
  bigCurrentPage = 1;
  clientList:any=[];
  constructor(private pilotService: PilotService) {}

  ngOnInit() {
    this.onPageLoad();
  }
  onPageLoad() {
    var fromLimit = this.bigCurrentPage.toString() + "0";
    var data = {
      from: this.pageNumber, //skip //offsert
      to: parseInt(fromLimit) - 10 //limit
    };
    this.bigCurrentPage = 1;
    this.pageNumber = 10;
    this.GetAllClients(data.from, data.to);
  }
  GetAllClients(num, val) {
    var data = { from: val, to: num };
    this.pilotService.getAllApprovedPilots(data).subscribe(data => {
      if (data.status && data.result) {
        this.clientList = data.result;
        console.log("this is clients list",this.clientList);

        this.bigTotalItems = parseInt(data.totalRecord);
      } else if (data.status && !data.result) {
        this.clientList = [];
        this.bigTotalItems = 0;
      }
    });
  }
}
