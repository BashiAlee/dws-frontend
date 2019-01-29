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
        this.pilotJobList.forEach((val) => {
          if (val.PilotIds) {
            val.PilotIds.forEach((res, index) => {
              if (this.userInfo.ID == res.PilotId && res.JobStatus == "completed") {
                val.JobStatus = "completed";
              } else if (this.userInfo.ID == res.PilotId && res.JobStatus != "completed") {
                val.JobStatus = "assigned";
              }
            });
          }
        });
      } else {
        this.pilotJobList = [];
      }
    });
  }
}
