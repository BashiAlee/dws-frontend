import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-information',
  templateUrl: './business-information.component.html',
  styleUrls: ['./business-information.component.scss']
})
export class BusinessInformationComponent implements OnInit {
  selectedSuffix;
  suffix = [
      { name: 'Jr.' },
      { name: 'Sr.' }
  ]
  constructor() { }

  ngOnInit() {
  }

}
