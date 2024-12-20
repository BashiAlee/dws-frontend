import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { PilotService } from '../../services/admin/pilots/pilots.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ModalsComponent } from '../../components/modals/modals.component';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Location } from '@angular/common';
import {
  NotificationService
} from './../../services/notifications/notification.service';
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
  role: any;
  userID: any;
  config = {
    class: 'custom-modal modal-dialog-centered modal-md',
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pilotService: PilotService,
    private modalService: BsModalService,
    private authService: AuthenticationService,
    private location: Location,
    private notification: NotificationService,
  ) {



    if (this.router.url.split('/')[1] === 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }

    if (this.router.url.split('/')[4] === 'personal-information' && this.router.url.split('/')[1] === 'admin') {
      this.role = 'pilot',
        this.userID = parseInt(this.router.url.split('/')[3]);
    }
    if (this.router.url.split('/')[2] === 'customer' && this.router.url.split('/')[1] === 'admin') {
      this.role = 'customer',
        this.userID = parseInt(this.router.url.split('/')[4]);
    }

  }

  ngOnInit() {

  }

  moveForward() {
    var leftPos = $('.custom-tabs').scrollLeft();
    $('.custom-tabs').animate({ scrollLeft: leftPos + 70 }, 400);

  }
  moveBackward() {
    var leftPos = $('.custom-tabs').scrollLeft();
    $('.custom-tabs').animate({ scrollLeft: leftPos - 70 }, 400);

  }

  approveProfile() {
    const initialState = {
      type: 'approved'
    };
    this.loaders.approveProfile = true;
    this.pilotService.approveProfile(this.userID)
      .subscribe(data => {
        if (data.status) {
          // const notificationdata = {
          //   UserId: this.userID,
          //   Message: 'Your Profile Has Been Approved',
          //   // JobId: this.jobData.JobId,
          // };
          // this.notification.saveNotification(notificationdata)
          //   .subscribe(data1 => {
          //   });
          this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
          this.bsModalRef.content.closeBtnName = 'Close';
          this.loaders.approveProfile = false;
        }
      }
      );
  }

  rejectProfile() {
    const initialState = {
      type: 'blocked'
    };
    this.loaders.rejectProfile = true;
    // console.log('this is pilot id', this.userID);

    this.pilotService.rejectProfile(this.userID)
      .subscribe(
        data => {
          if (data.status) {
            // const notificationdata = {
            //   UserId: this.userID,
            //   Message: 'Your Profile Has Been Rejected',
            //   // JobId: this.jobData.JobId,
            // };
            // this.notification.saveNotification(notificationdata)
            //   .subscribe(data1 => {
            //   });
            this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
            this.bsModalRef.content.closeBtnName = 'Close';
            this.loaders.rejectProfile = false;
          }
        }
      );
  }

  backToPage() {
    this.location.back();
  }

  sendMessage() {
    let params: NavigationExtras = {
      queryParams: {
        id: this.userID,
        role: this.role
      }
    };
    this.router.navigate(['/admin/communication'], params);
  }
}
