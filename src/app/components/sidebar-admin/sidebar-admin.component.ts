import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { AuthenticationService } from './../../services/authentication/authentication.service';

declare var $: any;

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class SidebarAdminComponent implements OnInit {
  subscription: Subscription;
  jobCount: any;
  @Input() isOpen: boolean;
  @Output() toggleEvent: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private authService: AuthenticationService,
  ) {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if (width < 768) {
      this.isOpen = false;
      // this.toggleEvent.emit(this.isOpen);
    } else {
      this.isOpen = true;
      // this.toggleEvent.emit(this.isOpen);
    }
    this.toggleEvent.emit(this.isOpen);
  }

  ngOnInit() {
    console.log("DDDD")
    this.GetJobCountAdmin();
    const source = interval(60000);
    this.subscription = source.subscribe(val => this.callEveryFiveMin());
  }
  callEveryFiveMin() {
    this.GetJobCountAdmin();
  }
  toggleNav() {
    // $('.sidebar').fadeOut();
    this.isOpen = !this.isOpen;
    this.toggleEvent.emit(this.isOpen);
  }
  GetJobCountAdmin() {
    this.authService.getJobCountAdmin().subscribe(data => {
      if (data.status) {
        this.jobCount = data.result;
      } else {
        this.jobCount = [];
      }
    });
  }
  onResize(e) {
    var width = e.target.innerWidth;
    if (width < 768) {
      this.isOpen = false;
      this.toggleEvent.emit(this.isOpen);
    } else {
      this.isOpen = true;
      this.toggleEvent.emit(this.isOpen);
    }
  }


}
