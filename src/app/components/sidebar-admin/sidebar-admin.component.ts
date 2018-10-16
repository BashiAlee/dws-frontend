import { Component, Input, Output, EventEmitter, OnInit  } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class SidebarAdminComponent implements OnInit {

  @Input() isOpen: boolean;
  @Output() toggleEvent: EventEmitter<boolean> =   new EventEmitter();
  constructor() { 
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if(width < 768) {
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
  }

  toggleNav() {
    // $('.sidebar').fadeOut();
    this.isOpen = !this.isOpen;
    this.toggleEvent.emit(this.isOpen);
  }

  onResize(e) {
    var width = e.target.innerWidth;
    if(width < 768) {
      this.isOpen = false;
      this.toggleEvent.emit(this.isOpen);
    } else {
      this.isOpen = true;
      this.toggleEvent.emit(this.isOpen);
    }
  }


}