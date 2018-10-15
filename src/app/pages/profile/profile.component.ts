import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PilotService } from '../../services/admin/pilots/pilots.service';

declare var $: any;
@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id: any;
  isAdmin: any;
  loaders: any = {};
  constructor(private route: ActivatedRoute, private router: Router, private pilotService: PilotService) {

    if(this.router.url.split('/')[1] =='admin') {
      this.isAdmin = true;
    }else {
      this.isAdmin = false;
    }

    console.log("DD", this.isAdmin)
   }
  
  ngOnInit() {

  }
  
  moveForward() {
    var leftPos = $('.custom-tabs').scrollLeft();
    $(".custom-tabs").animate({scrollLeft: leftPos + 70}, 400);

  }
  moveBackward() {
    var leftPos = $('.custom-tabs').scrollLeft();
    $(".custom-tabs").animate({scrollLeft: leftPos - 70}, 400);
   
  }

  approveProfile() {
    this.loaders.approveProfile = true;
    this.pilotService.approveProfile(this.router.url.split('/')[3])
    .subscribe(
      data => {
        if(data.status) {
          alert("Approved")
          this.loaders.approveProfile = false;
        }
      }
    )
  }

  rejectProfile() {
    this.loaders.rejectProfile = true;
    this.pilotService.rejectProfile(this.router.url.split('/')[3])
    .subscribe(
      data => {
        if(data.status) {
          alert("Rejected")
          this.loaders.rejectProfile = false;
        }
      }
    )
  }
}
