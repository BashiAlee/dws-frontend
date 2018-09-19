
import { Component, Input, Output, EventEmitter, OnInit  } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {  
  @Input() isOpen: boolean;
  @Output() toggleEvent: EventEmitter<boolean> =   new EventEmitter();
  constructor() { 
    this.isOpen = true;
  }

  ngOnInit() {
  }

  toggleNav() {
    this.isOpen = !this.isOpen;
    this.toggleEvent.emit(this.isOpen);
  }

}
