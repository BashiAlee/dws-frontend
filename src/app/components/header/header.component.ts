import {
  MessagesService
} from './../../services/messages/messages.service';
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
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  id: any;
  role: any;
  userInfo: any;
  isAdmin: any;
  isNavOpen: any;
  currentUserMessages: any = [];
  messageConversationId: any;
  selectedSenderChatName: any;
  adminAllMessages: any;
  adminCustomerMessages: any = [];
  adminPilotMessages: any = [];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private messageService: MessagesService
  ) {
    // this.id = this.authService.getCurrentUser().ID;
    // console.log("this is data",this.authService.getCurrentUser());

    // this.role = this.authService.getCurrentUser().Role;
  }

  ngOnInit() {
    if (this.router.url.split("/")[1] == "admin") {
      this.isAdmin = true;
      this.userInfo = JSON.parse(localStorage.getItem("admin"));
      this.id = this.authService.getCurrentAdmin().ID;
      this.role = this.authService.getCurrentAdmin().Role;
      this.getAdminMessages()
        .then(data => {})
        .catch(e => {
          console.log("errrr", e);
        });
    } else {
      this.isAdmin = false;
      this.userInfo = this.authService.getCurrentUser();
      this.id = this.authService.getCurrentUser().ID;
      this.role = this.authService.getCurrentUser().Role;
      this.getCurrentUsersMessages();
    }
    //     $(document).click(function(){
    //   console.log("hereee")
    // $(".custom-sidebar").hide();
    // });
  }


  check(url) {
    this.authService.checkImageExists(url).subscribe(
      data => {
        this.userInfo.ProfileImage = url;
      },
      err => {
        this.userInfo.ProfileImage = "";
      }
    );
  }

  openMenu() {
    this.isNavOpen = !this.isNavOpen;
  }
  hideDropdown() {
    this.isNavOpen = false;
  }

  getCurrentUsersMessages() {
    this.userInfo = this.authService.getCurrentUser();
    var data = this.userInfo;
    this.messageService.getMessagesListOfCurrentUser(data).subscribe(data => {
      console.log("Current User All Messages ----> ", data.result);
      if (data.status) {
        this.currentUserMessages = data.result;
        this.messageConversationId = data.result[0].ConversationId;
      }
    });
  }

  async getAdminMessages() {
    let promise = new Promise((resolve, reject) => {
      this.messageService
        .getMessagesListOfCurrentUserAdmin("pilot")
        .subscribe(dataPilot => {
          if (dataPilot.status) {
            this.adminPilotMessages = dataPilot.result;
            this.messageService
              .getMessagesListOfCurrentUserAdmin("customer")
              .subscribe(dataCustomer => {
                if (dataCustomer.status) {
                  this.adminCustomerMessages = dataCustomer.result;
                  resolve(
                    (this.adminAllMessages = this.adminPilotMessages.concat(
                      this.adminCustomerMessages
                    ))
                  );
                }
              });
          } else {
            this.messageService
              .getMessagesListOfCurrentUserAdmin("customer")
              .subscribe(dataCustomer => {
                if (dataCustomer.status) {
                  this.adminCustomerMessages = dataCustomer.result;
                  resolve(
                    (this.adminAllMessages = this.adminPilotMessages.concat(
                      this.adminCustomerMessages
                    ))
                  );
                }
              });
          }
        });
    });
    let result = await promise;
  }
}
