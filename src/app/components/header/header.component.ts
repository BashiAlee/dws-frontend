import {
  MessagesService
} from './../../services/messages/messages.service';
import {
  NotificationService
} from './../../services/notifications/notification.service';
import {
  CommunicationComponent
} from './../../pages/admin/communication/communication.component';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  AuthenticationService
} from '../../services/authentication/authentication.service';
import {
  Router
} from '@angular/router';
import { interval, Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  id: any;
  role: any;
  userInfo: any;
  isAdmin: any;
  isNavOpen: any;
  isViewed: any;
  currentUserMessages: any = [];
  currentUserNotification: any = [];
  messageConversationId: any;
  selectedSenderChatName: any;
  adminAllMessages: any = [];
  adminCustomerMessages: any = [];
  adminPilotMessages: any = [];
  subscription: Subscription;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private messageService: MessagesService,
    private notificationService: NotificationService
  ) {
    // this.id = this.authService.getCurrentUser().ID;
    // console.log('this is data',this.authService.getCurrentUser());
    // this.role = this.authService.getCurrentUser().Role;
  }

  ngOnInit() {
    if (this.router.url.split('/')[1] === 'admin') {
      this.isAdmin = true;
      this.userInfo = this.authService.getCurrentAdmin();
      this.getAllAdminMessages().then(res => {
        this.adminAllMessages = res;
      }).catch(err => {
        this.adminAllMessages = [];
      });
    } else {
      this.isAdmin = false;
      this.userInfo = this.authService.getCurrentUser();
      this.getCurrentUsersMessages(this.userInfo.ID);
      this.GetUnViewedUserNotification(this.userInfo.ID);
      const source = interval(30000);
      this.subscription = source.subscribe(val => this.callEveryFiveMin());
    }
  }

  callEveryFiveMin() {
    this.getCurrentUsersMessages(this.userInfo.ID);
    this.GetUnViewedUserNotification(this.userInfo.ID);
  }
  check(url) {
    this.authService.checkImageExists(url).subscribe(
      data => {
        this.userInfo.ProfileImage = url;
      },
      err => {
        this.userInfo.ProfileImage = '';
      }
    );
  }
  logout() {
    if (this.userInfo.Role === 'admin') {
      localStorage.removeItem('admin');
      this.router.navigate(['/panel/admin']);
    } else {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    }
  }
  openMenu() {
    this.isNavOpen = !this.isNavOpen;
  }
  hideDropdown() {
    this.isNavOpen = false;
  }
  readNotification() {
    console.log('this is id ');

    this.isViewed = false;
    // this.router.navigate(['/user/job/', this.currentUserNotification.JobId]);
  }
  viewAllNotification() {
    this.isViewed = false;
    this.router.navigate(['/user/notifications']);
  }
  getCurrentUsersMessages(id) {
    this.messageService.getMessagesListOfCurrentUser(id).subscribe(data => {
      if (data.status) {

        this.currentUserMessages = data.result;
        this.messageConversationId = data.result[0].ConversationId;
      }
    });
  }
  GetUnViewedUserNotification(id) {
    this.notificationService.getUnViewedUserNotification(id).subscribe(data => {
      if (data.status) {
        this.currentUserNotification = data.result;
        this.isViewed = true;
      } else {
        this.currentUserNotification = [];
      }
    });
  }

  // async getAdminMessages() {
  //   let promise = new Promise((resolve, reject) => {
  //     this.messageService
  //       .getMessagesListOfCurrentUserAdmin('pilot')
  //       .subscribe(dataPilot => {
  //         console.log('this ispilot data', dataPilot);

  //         if (dataPilot.status) {
  //           this.adminPilotMessages = dataPilot.result;
  //           this.messageService
  //             .getMessagesListOfCurrentUserAdmin('customer')
  //             .subscribe(dataCustomer => {
  //               if (dataCustomer.status) {
  //                 this.adminCustomerMessages = dataCustomer.result;

  //                 resolve(
  //                   (this.adminAllMessages = this.adminPilotMessages.concat(
  //                     this.adminCustomerMessages
  //                   ))
  //                 );
  //                 console.log('this is custt data', this.adminAllMessages);
  //               }
  //             });
  //         } else {
  //           this.messageService
  //             .getMessagesListOfCurrentUserAdmin('customer')
  //             .subscribe(dataCustomer => {
  //               if (dataCustomer.status) {
  //                 this.adminCustomerMessages = dataCustomer.result;
  //                 resolve(
  //                   (this.adminAllMessages = this.adminPilotMessages.concat(
  //                     this.adminCustomerMessages
  //                   ))
  //                 );
  //               }
  //             });
  //         }
  //       });
  //   });
  //   let result = await promise;
  // }

  getAllAdminMessages() {
    return new Promise((resolve, reject) => {
      this.messageService.getMessagesListOfCurrentUserAdmin('pilot')
        .subscribe(pilot => {
          if (pilot.status) {
            this.messageService.getMessagesListOfCurrentUserAdmin('customer')
              .subscribe(cust => {
                if (cust.status) {
                  resolve(pilot.result.concat(cust.result));
                } else {
                  resolve(pilot.result);
                }
              });
          } else {
            this.messageService
              .getMessagesListOfCurrentUserAdmin('customer')
              .subscribe(cust => {
                if (cust.status) {
                  resolve(cust.result);
                } else {
                  var res = [];
                  reject(res);
                }
              });
          }
        });
    });
  }
}
