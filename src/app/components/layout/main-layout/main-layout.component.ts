import { Component, OnInit, ViewChild } from '@angular/core';


import { WOW } from '../../../../assets/3rdParty/js/wow';
import { SidebarComponent } from '../../sidebar/sidebar.component';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  isOpen :boolean;
  @ViewChild(SidebarComponent) sidebar: SidebarComponent;
  title = 'DWS-Frontend';

  constructor(){
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if(width < 768) {
      this.isOpen = false;
    } else {
      this.isOpen = true;
    }

  }

  checkSidebar(data) {
   

      this.isOpen = data;
    
   
  }

  ngOnInit() {
    new WOW().init();
  }

}
