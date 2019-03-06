import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { PilotService } from '../../services/admin/pilots/pilots.service';
import { NotificationService } from './../../services/notifications/notification.service';
import { JobService } from './../../services/job/job.service';
import * as moment from 'moment';

@Component({
  selector: 'custom-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {
  ClientDeliverables: any;
  jobStatusArray: any = [];
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
  msg: string;
  timeout: any;
  fileLink: any;
  constructor(
    public bsModalRef: BsModalRef,
    private router: Router,
    private authService: AuthenticationService,
    private pilotService: PilotService,
    private notification: NotificationService,
    private jobService: JobService,

  ) {
    this.userInfo = this.authService.getCurrentUser();
    this.getAdmin();
  }
  resetStars() {
    this.rate = 0;
    this.isReadonly = false;
  }
  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.ClientDeliverables = fileList[0];
      // console.log('data of xipdsdsa', this.ClientDeliverables);
    }
  }

  uploadClientFiles(pilotId, jobId, jobTitle) {
    this.jobService.uploadClietFiles(this.ClientDeliverables).subscribe(data => {
      if (data.status) {
        this.jobStatusArray = {
          PilotId: pilotId,
          JobId: jobId,
          Status: 'completed',
          JobCompletionTime: moment().format('YYYY-MM-DD[T]HH:mm:ss'),
          JobDeliverables: data.result
        };
        this.jobService.jobStatus(this.jobStatusArray).subscribe(res => {
          if (res.status) {
            const notificationdata = {
              UserId: this.adminData.ID,
              Message: 'Pilot Claimed The job ' + jobTitle + ' has been completed',
              JobId: jobId,
            };
            this.notification.saveNotification(notificationdata).subscribe(data1 => {

            });
          } else {

          }
        });
        this.closeModal();
      } else {
        this.msg = data.message;
        this.timeout = 5000;
        console.log('fail', data);
      }
    });
  }
  getAdmin() {
    this.authService.getAdmin().subscribe(data => {
      if (data.status) {
        this.adminData = data.result;
        // console.log('this is admin data', this.adminData);
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
        // console.log('this is data', notificationdata);

        notificationdata.forEach(val => {
          this.notification.saveNotification(val)
            .subscribe(data1 => {
            });
        });
      }
    });
  }

  uploadFileUrl(pilotId, jobId, jobTitle) {
    this.jobStatusArray = {
      PilotId: pilotId,
      JobId: jobId,
      Status: 'completed',
      JobCompletionTime: moment().format('YYYY-MM-DD[T]HH:mm:ss'),
      JobDeliverables: this.fileLink
    };
    this.jobService.jobStatus(this.jobStatusArray).subscribe(res => {
      if (res.status) {
        const notificationdata = {
          UserId: this.adminData.ID,
          Message: 'Pilot Claimed The job ' + jobTitle + ' has been completed',
          JobId: jobId,
        };
        this.notification.saveNotification(notificationdata).subscribe(data1 => {

        });
      } else {

      }
    });
    this.closeModal();
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


