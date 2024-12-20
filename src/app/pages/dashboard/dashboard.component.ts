import { PilotService } from './../../services/admin/pilots/pilots.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { JobService } from './../../services/job/job.service';
import { MessagesService } from "../../services/messages/messages.service";
// import * as _ from "lodash";
import * as moment from "moment";

declare var google;

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  pilotJobList: any;
  single: any[];
  multi: any[];

  view: any[] = [700, 400];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  colorScheme = {
    domain: ["#5dcc31", "#fa972c", "#fc5757"]
  };

   colorSchemePilot = {
    domain: ["#29abe2", "#5dcc31", "#fa972c"]
  };

  userInfo: any;
  adminInfo: any;
  newJob: any = 0;
  completedJobs: any = 0;
  completedThisMonth: any = 0;
  totalJobs: any = 0;
  pendingJobs: any = 0;
  deletedJobs: any = 0;

  unreadMessages: any = [];
  constructor(
    private authService: AuthenticationService,
    private jobSevice: JobService,
    private pilotService: PilotService,
    private messageService: MessagesService
  ) {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    console.log("this is called", width);

    if (width < 800) {
      this.view = [400, 200];
      console.log("this is called", window.pageXOffset);


    } else {
    }
    this.userInfo = this.authService.getCurrentUser();
    if (this.userInfo.Role == "customer") {
      this.GetCurrentUserJobs(this.userInfo.ID).then(res => {
        if (res) {
          this.single = [
            {
              name: "Completed Jobs",
              value: this.completedJobs
            },
            {
              name: "Pending Jobs",
              value: this.pendingJobs
            },
            {
              name: "Deleted Jobs",
              value: this.deletedJobs
            }
          ];
        }
      }).catch((err) => {
        this.single = [
          {
            name: "Completed Jobs",
            value: this.completedJobs
          },
          {
            name: "Pending Jobs",
            value: this.pendingJobs
          },
          {
            name: "Deleted Jobs",
            value: this.deletedJobs
          }
        ];
      });
      Object.assign(this, this.single);
    } else {
      this.GetPilotJobs(this.userInfo.ID).then(res => {
        if (res) {
          this.single = [
            {
              name: "Total Jobs Completed",
              value: this.completedJobs
            },
            {
              name: "Completed This Month",
              value: this.completedThisMonth
            },
            {
              name: "New Job",
              value: this.newJob
            }
          ];
        }
      }).catch((err) => {
        this.single = [
          {
            name: "Total Jobs Completed",
            value: this.completedJobs
          },
          {
            name: "Completed This Month",
            value: this.completedThisMonth
          },
          {
            name: "New Job",
            value: this.newJob
          }
        ];
      });
      Object.assign(this, this.single);
    }
  }

  ngOnInit() {
    this.GetUnreadMessagesById(this.userInfo.ID);
  }
  GetUnreadMessagesById(id) {
    this.messageService.getUnreadMessagesById(id).subscribe(data => {
      if (data.status) {
        data.result.forEach(val => {
          val.MessageTime = moment(val.MessageTime).format("LT");
          this.unreadMessages.push(val);
        });
      } else {
        this.unreadMessages[0];
      }
    });
  }
  GetCurrentUserJobs(id) {
    return new Promise((resolve, reject) => {
      this.jobSevice.getCurrentUserJobs(id).subscribe(data => {
        if (data.status && data.result) {
          this.totalJobs = data.result.length;
          // console.log("kjbjkbkbkb", this.totalJobs);
          data.result.forEach((val, index) => {
            if (val.JobStatus == "completed") {
              this.completedJobs++;
            } else if (val.IsQuote == true) {
              this.pendingJobs++;
            } else if (val.JobStatus == "archived") {
              this.deletedJobs++;
            }
            if (index == data.result.length - 1) {
              resolve(true);
            }
          });
        } else {
          this.totalJobs = 0;
          this.completedJobs = 0;
          this.pendingJobs = 0;
          reject(false);
        }
      });
    });
  }

  GetPilotJobs(id) {
    return new Promise((resolve, reject) => {
      this.pilotService.pilotJobs(id).subscribe(data => {
        if (data.status && data.result) {
          this.pilotJobList = data.result;

          this.pilotJobList.forEach((val, index) => {
            if (val.PilotIds) {
              val.PilotIds.forEach((res, index) => {
                if (this.userInfo.ID == res.PilotId && res.JobStatus == "completed") {
                    this.completedJobs++;
                  var month = new Date(res.JobCompletionTime);
                  var jobMonth = moment(month).format("MMMM YYYY");
                  var currentMonth = moment().format('MMMM YYYY');

                  if (moment(jobMonth).isSame(currentMonth) ) {
                      this.completedThisMonth++;
                    }
                }else if (this.userInfo.ID == res.PilotId && res.JobStatus == "assigned") {
                  this.newJob++;
                }
              });
            }
            if (index == data.result.length - 1) {
              resolve(true);
            }
          });
        } else {
          this.totalJobs = 0;
          this.completedJobs = 0;
          this.pendingJobs = 0;
          reject(false);
        }
      });
    });
  }
}
