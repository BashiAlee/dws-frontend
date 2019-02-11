
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { interval, Subscription } from 'rxjs';

declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  id: any;
  role: any;
  subscription: Subscription;
  jobCount: any;
  @Input() isOpen: boolean;
  @Output() toggleEvent: EventEmitter<boolean> = new EventEmitter();
  constructor(private authService: AuthenticationService) {
    this.id = this.authService.getCurrentUser().ID;
    this.role = this.authService.getCurrentUser().Role;


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
    this.GetJobCounterUser(this.id);
    const source = interval(60000);
    this.subscription = source.subscribe(val => this.callEveryFiveMin());
  }
  callEveryFiveMin() {
    this.GetJobCounterUser(this.id);
  }
  toggleNav() {
    // $('.sidebar').fadeOut();
    this.isOpen = !this.isOpen;
    this.toggleEvent.emit(this.isOpen);
  }
  GetJobCounterUser(id) {
    this.authService.getJobCountUser(id).subscribe(data => {
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
