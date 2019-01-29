import { Component, OnInit } from "@angular/core";
import { PilotService } from "../../../services/admin/pilots/pilots.service";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { MessagesService } from "../../../services/messages/messages.service";
import * as moment from "moment";
@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"]
})
export class AdminDashboardComponent implements OnInit {
  pilotJobList: any=[];
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
  newJobs: any = 0;
  completedJobs: any = 0;
  activeJobs: any = 0;
  totalJobs: any = 0;
  pendingJobs: any = 0;
  deletedJobs: any = 0;

  unreadMessages: any = [];
  userUnreadMessages:any=[];
  constructor(
    private authService: AuthenticationService,
    private pilotService: PilotService,
    private messageService: MessagesService
  ) {
    this.userInfo = this.authService.getCurrentUser();
    this.adminInfo = this.authService.getCurrentAdmin();
    this.GetAllJobs()
      .then(res => {
        if (res) {
          this.single = [
            {
              name: "Total Jobs Completed",
              value: this.completedJobs
            },
            {
              name: "Active Jobs",
              value: this.activeJobs
            },
            {
              name: "New Job",
              value: this.newJobs
            }
          ];
        }
      })
      .catch(err => {
        this.single = [
          {
            name: "Total Jobs Completed",
            value: this.completedJobs
          },
          {
            name: "Active Jobs",
            value: this.activeJobs
          },
          {
            name: "New Job",
            value: this.newJobs
          }
        ];
      });
    Object.assign(this, this.single);
  }

  ngOnInit() {
    this.GetUsersUnreadMessages();
  }
  GetUsersUnreadMessages() {
    this.messageService.getUsersUnreadMessages().subscribe(data => {
      if (data.status) {
        data.result.forEach(val => {
          if (this.adminInfo.ID == val.MessageTo) {
            val.MessageTime = moment(val.MessageTime).format("LT");
            this.unreadMessages.push(val);
          } else {
            console.log("user unread messages", val);
          }
          console.log("admin unread messages", val);


        });
      } else {
        this.unreadMessages[0];
      }
    });
  }
  // GetCurrentUserJobs(id) {
  //   return new Promise((resolve, reject) => {
  //     this.jobSevice.getCurrentUserJobs(id).subscribe(data => {
  //       if (data.status && data.result) {
  //         this.totalJobs = data.result.length;
  //         // console.log("kjbjkbkbkb", this.totalJobs);
  //         data.result.forEach((val, index) => {
  //           if (val.JobStatus == "completed") {
  //             this.completedJobs++;
  //           } else if (val.IsQuote == true) {
  //             this.pendingJobs++;
  //           } else if (val.JobStatus == "archived") {
  //             this.deletedJobs++;
  //           }
  //           if (index == data.result.length - 1) {
  //             resolve(true);
  //           }
  //         });
  //       } else {
  //         this.totalJobs = 0;
  //         this.completedJobs = 0;
  //         this.pendingJobs = 0;
  //         reject(false);
  //       }
  //     });
  //   });
  // }

  GetAllJobs() {
    return new Promise((resolve, reject) => {
      this.pilotService.getAllJobs().subscribe(data => {
        if (data.status && data.result) {
          this.pilotJobList = data.result;
          console.log("this is data", this.pilotJobList);

          this.pilotJobList.forEach((val, index) => {
            if (val.JobStatus == "completed") {
              this.completedJobs++;
            } else if (val.JobStatus == "assigned") {
              this.activeJobs++;
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
