import { Component, OnInit } from '@angular/core';
import {
  NotificationService
} from './../../services/notifications/notification.service';
import {
  AuthenticationService
} from '../../services/authentication/authentication.service';
import * as moment from 'moment';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  userNotificationList: any = [];
  userInfo: any;
  constructor(
    private notificationService: NotificationService,
    private authService: AuthenticationService,


  ) { }
  ngOnInit() {
    this.userInfo = this.authService.getCurrentUser();
    this.GetUserNotificationList(this.userInfo.ID);
  }

  GetUserNotificationList(id) {
    this.notificationService.getUserNotificationList(id).subscribe(data => {
      if (data.status) {
        data.result.forEach(val => {
          val.NotificationTime = moment(val.NotificationTime).format('LT');
          this.userNotificationList.push(val);
        });
      } else {
        this.userNotificationList = [0];
      }
    });
  }
}
