import { PilotService } from './../../../services/admin/pilots/pilots.service';
import { Router } from "@angular/router";
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, ViewChild, TemplateRef } from "@angular/core";
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from "date-fns";
import { Subject } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CalendarEvent, CalendarView } from "angular-calendar";
import * as moment from "moment";
const colors: any = {
  red: {
    primary: "#f14b4b",
    secondary: "#FAE3E3"
  },
  green: {
    primary: "#5dcc31",
    secondary: "#D1E8FF"
  },

  blue: {
    primary: "#1e90ff",
    secondary: "#D1E8FF"
  },
  yellow: {
    primary: "#fa972c",
    secondary: "#FDF1BA"
  }
};

@Component({
  selector: "app-admin-job-calender",
  templateUrl: "./admin-job-calender.component.html",
  styleUrls: ["./admin-job-calender.component.scss"]
})
export class AdminJobCalenderComponent implements OnInit {
  userInfo: any;
  pilotJobList: any = [];
  startTime: any;
  endTime: any;
  constructor(
    private modal: NgbModal,
    private pilotService: PilotService,
    private authService: AuthenticationService,
    private router: Router
  ) {}
  ngOnInit() {
    this.userInfo = this.authService.getCurrentUser();
    this.GetAllJobs();
  }
  @ViewChild("modalContent")
  modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen: boolean = false;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }) {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  handleEvent(event: CalendarEvent): void {
    // console.log("this is data", event);
    this.router.navigate(["admin/job", event.color]);
  }

  GetAllJobs() {
    return new Promise((resolve, reject) => {
      this.pilotService.getAllJobs().subscribe(data => {
        if (data.status && data.result) {
          this.pilotJobList = data.result;
          this.pilotJobList.forEach(val => {
            // console.log("this is data", val.JobStatus);
            if (val.JobStatus == "assigned") {
              val.DateRanges.From = moment.utc(val.DateRanges.From).format();
              val.DateRanges.To = moment.utc(val.DateRanges.To).format();
              if (val.DateRanges.FromDate != "" && val.DateRanges.ToDate) {
                this.events.push({
                  title: val.JobTitle,
                  start: startOfDay(
                    new Date(moment(val.DateRanges.FromDate).format("lll"))
                  ),
                  end: endOfDay(
                    new Date(moment(val.DateRanges.ToDate).format("lll"))
                  ),
                  color: val.JobId
                });
                this.refresh.next();
              } else {
                var date = val.DateRanges.FromDate;
                this.startTime = val.DateRanges.From;
                this.endTime = val.DateRanges.To;
                this.startTime = date + " " + this.startTime.split("T")[1];
                this.endTime = date + " " + this.endTime.split("T")[1];
                this.events.push({
                  title: val.JobTitle,
                  start: addHours(this.startTime.replace("Z", ""), 0),
                  end: addHours(this.endTime.replace("Z", ""), 0),
                  color: val.JobId
                });
                this.refresh.next();
              }
            }

          });
        } else {
          this.pilotJobList=[];
          reject(false);
        }
      });
    });
  }
}
