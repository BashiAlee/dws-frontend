import { Component, OnInit, ViewChild } from '@angular/core';


import { WOW } from '../../../../assets/3rdParty/js/wow';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  isOpen :boolean;
  isAdmin: any;
  @ViewChild(SidebarComponent) sidebar: SidebarComponent;
  title = 'DWS-Frontend';

  constructor(private route: Router){
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
    if(this.route.url.split('/')[1]== "admin") {
      this.isAdmin = true;
    }
    new WOW().init();
  }

}
