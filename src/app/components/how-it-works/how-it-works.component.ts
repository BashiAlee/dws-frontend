import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {
  @Input() type: string;
  pageType: any;
  constructor() {
   }

  ngOnInit() {
   this.pageType =  this.type;
  }

}
