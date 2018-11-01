import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { WOW } from '../assets/3rdParty/js/wow';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
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
