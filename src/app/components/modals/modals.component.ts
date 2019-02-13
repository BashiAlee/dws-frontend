import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { PilotService } from '../../services/admin/pilots/pilots.service';
import { NotificationService } from './../../services/notifications/notification.service';

@Component({
  selector: 'custom-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {
  type: string;
  PilotId: any;
  JobId: any;
  JobTitle: any;
  closeBtnName: string;
  userInfo: any;
  config: any = {};
  max = 5;
  rate = 1.5;
  isReadonly = false;
  pilotRating: any;
  adminData: any = [];

  constructor(
    public bsModalRef: BsModalRef,
    private router: Router,
    private authService: AuthenticationService,
    private pilotService: PilotService,
    private notification: NotificationService,

  ) {
    this.userInfo = this.authService.getCurrentUser();
    this.getAdmin();
  }
  resetStars() {
    this.rate = 0;
    this.isReadonly = false;
  }
  getAdmin() {
    this.authService.getAdmin().subscribe(data => {
      if (data.status) {
        this.adminData = data.result;
        console.log('this is admin data', this.adminData);

      }
    });
  }

  updateRating(rating, pilotId, jobId, jobTitle) {
    this.pilotRating = {
      UserId: pilotId,
      Rating: rating,
      JobId: jobId,
    };
    this.pilotService.updatePilotRating(this.pilotRating).subscribe(data => {
      if (data.status) {
        const notificationdata = [
          {
            UserId: pilotId,
            Message: 'You got a rating for' + ' ' + jobTitle,
            JobId: jobId,
          },
          {
            UserId: this.adminData.ID,
            Message: 'Customer rated the pilot for' + ' ' + jobTitle,
            JobId: jobId,
          },

        ];
        console.log('this is data', notificationdata);

        notificationdata.forEach(val => {
          this.notification.saveNotification(val)
            .subscribe(data1 => {
            });
        });
      }
    });
  }
  ngOnInit() {
    // this.modalRef = this.modelServie.show('template');
  }

  moveToNextRoute(pageName, id) {
    this.router.navigate(['/user/profile/+' + id + '/' + pageName]);
    this.bsModalRef.hide();
  }

  movetoSignup() {
    this.router.navigate(['/signuppilot']);
    this.bsModalRef.hide();
  }
  closeModal() {
    this.bsModalRef.hide();
  }
  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modelServie.show(template);
  // }
}


