import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pilot-list',
  templateUrl: './pilot-list.component.html',
  styleUrls: ['./pilot-list.component.scss']
})
export class PilotListComponent implements OnInit {
  dtOptions: any;
  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      pageLength: 10,
      responsive: true,
      scrollY: true
    };
  }

}
