import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  apiUrl: any;
  staticUrl: any;
  constructor(private http: Http) {
    this.apiUrl = environment.apiURL;
    this.staticUrl = environment.uploadUrl;
  }

  saveNotification(data) {
    return this.http.post(this.apiUrl + 'notification/addNotification', data).pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }
  notificationStatus(data) {
    return this.http.post(this.apiUrl + 'notification/notificationStatus', data).pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }

  getUnViewedUserNotification(id) {
    return this.http.get(this.apiUrl + 'notification/unviewedUserNotification/' + id).pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }
  getUserNotificationList(id) {
    return this.http.get(this.apiUrl + 'notification/userNotificationList/' + id).pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }
}
