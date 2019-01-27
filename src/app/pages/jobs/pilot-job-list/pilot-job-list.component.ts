import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { PilotService } from './../../../services/admin/pilots/pilots.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-pilot-job-list",
  templateUrl: "./pilot-job-list.component.html",
  styleUrls: ["./pilot-job-list.component.scss"]
})
export class PilotJobListComponent implements OnInit {
  userInfo: any;
  pilotJobStatus: any ;
  pilotJobList: any ;
  startTime: any;
  endTime: any;
  constructor(
    private authService: AuthenticationService,
    private pilotService: PilotService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userInfo = this.authService.getCurrentUser();

    this.getPilotJobs(this.userInfo.ID);
  }
  getPilotJobs(id) {
    this.pilotService.pilotJobs(id).subscribe(data => {
      if (data.status && data.result) {
        this.pilotJobList = data.result;
        var count = 0;
        this.pilotJobList.forEach((val) => {
          if (val.PilotIds) {
            val.PilotIds.forEach((res, index) => {
              if (this.userInfo.ID == res.PilotId && res.JobStatus == "completed") {
                val.JobStatus = "completed";

              } else if (this.userInfo.ID == res.PilotId && res.JobStatus != "completed") {
                val.JobStatus = "assigned";
              }
              // if(res.JobStatus == 'completed') {
              //   count++;
              // }
              // if (val.PilotIds.length == count) {
              //   val.JobStatus = 'completed'
              // } else {
              //   val.JobStatus = 'assigned'
              // }
            });
          }
        });
        // this.pilotJobList[0].PilotIds.forEach(val => {
        //   if (val.PilotId == this.userInfo.ID) {
        //     this.pilotJobStatus=val
        //   }
        // });


        // this.pilotJobList.forEach(val => {
        //   if (val.DateRanges.FromDate != "" && val.DateRanges.ToDate) {
        //     this.events.push({
        //       title: val.JobTitle,
        //       start: startOfDay(
        //         new Date(moment(val.DateRanges.FromDate).format("lll"))
        //       ),
        //       end: endOfDay(
        //         new Date(moment(val.DateRanges.ToDate).format("lll"))
        //       ),
        //       color: val.JobId
        //     });
        //     this.refresh.next();
        //   } else if (val.DateRanges.FromDate != "") {
        //     var date = val.DateRanges.FromDate;
        //     this.startTime = val.DateRanges.From;
        //     this.endTime = val.DateRanges.To;

        //     this.startTime =
        //       date.split("T")[0] + " " + this.startTime.split("T")[1];
        //     this.endTime =
        //       date.split("T")[0] + " " + this.endTime.split("T")[1];

        //     this.events.push({
        //       title: val.JobTitle,
        //       start: addHours(this.startTime, 0),
        //       end: addHours(this.endTime, 0),
        //       color: val.JobId
        //     });
        //     this.refresh.next();
        //   }
        // });
      } else {
        this.pilotJobList = [];
      }
    });
  }
}
