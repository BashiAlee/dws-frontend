import { PilotService } from './../../services/admin/pilots/pilots.service';
import { Router } from "@angular/router";
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { JobService } from './../../services/job/job.service';
import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy, ViewChild, TemplateRef} from "@angular/core";
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours} from "date-fns";
import { Subject } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CalendarEvent, CalendarView} from "angular-calendar";
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
  selector: "app-job-calender",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./job-calender.component.html",
  styleUrls: ["./job-calender.component.scss"]
})
export class JobCalenderComponent implements OnInit {
  userInfo: any;
  activeJobList: any = [];
  pilotJobList: any = [];
  startTime: any;
  endTime: any;
  constructor(
    private modal: NgbModal,
    private jobSevice: JobService,
    private pilotService: PilotService,
    private authService: AuthenticationService,
    private router: Router
  ) {}
  ngOnInit() {
    this.userInfo = this.authService.getCurrentUser();
    if (this.userInfo.Role == 'customer') {
      this.getUserActiveJobs(this.userInfo.ID);
     }
    else{
      this.getPilotJobs(this.userInfo.ID);
    }
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
    this.router.navigate(["user/job", event.color]);
  }

  getUserActiveJobs(id) {
    this.jobSevice.getUserActiveJobs(id).subscribe(data => {
      if (data.status && data.result) {
        this.activeJobList = data.result;

        this.activeJobList.forEach(val => {
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
          } else{
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
        });
      } else {
        this.activeJobList = [];
      }
    });
  }
  getPilotJobs(id) {
    this.pilotService.pilotJobs(id).subscribe(data => {
      if (data.status && data.result) {
        this.pilotJobList = data.result;
        console.log("this id pilot jobs",this.pilotJobList);
        this.pilotJobList.forEach(val => {
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
        });
      } else {
        this.pilotJobList = [];
      }
    });
  }
}
