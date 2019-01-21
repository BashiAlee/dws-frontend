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

  userInfo: any;
  adminInfo:any;
  // currentUserMessages: any = [];
  // allMessagesByConversationId: any;
  // selectedSenderChatName: any;
  // messageConversationId: any;
  // lastMessageDate: any;
  // pilotMessages: any;
  // isPilotTab: any = true;
  // tabRole: any = "pilot";
  // onlineUserId: any;
  // userType: any;
  // adminMessageToUserId: any;
  // selectedUser: any;

  completedJobs: any = 0;
  totalJobs: any = 0;
  pendingJobs: any = 0;
  deletedJobs: any = 0;

  unreadMessages:any=[];
  constructor(
    private authService: AuthenticationService,
    private jobSevice: JobService,
    private messageService: MessagesService
  ) {
    this.userInfo = this.authService.getCurrentUser();
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
      } else {
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
    });
    Object.assign(this, this.single);
  }

  ngOnInit() {
    this.GetUnreadMessagesById(this.userInfo.ID)
  }
  // onSelect(event) {
  //   console.log("kjbjkbkbkb", event);
  // }
  GetUnreadMessagesById(id){
    this.messageService.getUnreadMessagesById(id).subscribe(data => {
      if (data.status) {
        data.result.forEach(val => {
          val.MessageTime = moment(val.MessageTime).format("LT");
          this.unreadMessages.push(val);
        });

      } else {
        // console.log("Messages fdvdfvdfvfd ", this.unreadMessages);
        this.unreadMessages[0];
      }
    });
  }
  GetCurrentUserJobs(id) {
    return new Promise((resolve, reject) => {
      this.jobSevice.getCurrentUserJobs(id).subscribe(data => {
        if (data.status && data.result) {
          this.totalJobs = data.result.length;
          data.result.forEach((val, index) => {
            // if(this.userInfo.Role=='pilot'){
            //   console.log("this is val");

            //   var d = new Date();
            //   var n = d.getMonth();
            // }
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

}
