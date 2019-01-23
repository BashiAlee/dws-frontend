import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PilotService } from '../../services/admin/pilots/pilots.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModalsComponent } from '../../components/modals/modals.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Location } from '@angular/common';

declare var $: any;
@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id: any;
  bsModalRef: BsModalRef;
  isAdmin: any;
  loaders: any = {};
  user: any;
  config = {
    class: "custom-modal modal-dialog-centered modal-md"
  };
  constructor(private route: ActivatedRoute, private router: Router, private pilotService: PilotService, private modalService: BsModalService, private authService: AuthenticationService, private location: Location) {
    

    if(this.router.url.split('/')[1] =='admin') {
      this.isAdmin = true;
    }else {
      this.isAdmin = false;
    }

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
    const initialState = {
      type: 'approved'
    }
    this.loaders.approveProfile = true;
    this.pilotService.approveProfile(this.router.url.split('/')[3])
    .subscribe(
      data => {
        if(data.status) {
          this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
          this.bsModalRef.content.closeBtnName = 'Close';
          this.loaders.approveProfile = false;
        }
      }
    )
  }

  rejectProfile() {
    const initialState = {
      type: 'blocked'
    }
    this.loaders.rejectProfile = true;
    this.pilotService.rejectProfile(this.router.url.split('/')[3])
    .subscribe(
      data => {
        if(data.status) {
          this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
          this.bsModalRef.content.closeBtnName = 'Close';
          this.loaders.rejectProfile = false;
        }
      }
    )
  }

  backToPage() {
    this.location.back();
  }
}
