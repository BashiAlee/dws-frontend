import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }
  
  moveForward() {
    var leftPos = $('.custom-tabs').scrollLeft();
    $(".custom-tabs").animate({scrollLeft: leftPos + 70}, 400);
    console.log("For",leftPos )
  }
  moveBackward() {
    var leftPos = $('.custom-tabs').scrollLeft();
    $(".custom-tabs").animate({scrollLeft: leftPos - 70}, 400);
    console.log("Back",leftPos )
  }
}
