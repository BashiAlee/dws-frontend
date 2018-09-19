import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isOpen :boolean;
  @ViewChild(SidebarComponent) sidebar: SidebarComponent;
  title = 'DWS-Frontend';

  constructor(){
    this.isOpen = true;
  }

  checkSidebar(data) {
   

      this.isOpen = data;
    
   
  }
  
}
