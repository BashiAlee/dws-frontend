import { MessagesService } from './../../services/messages/messages.service';
import { CommunicationComponent } from './../../pages/admin/communication/communication.component';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  userInfo: any;
  isAdmin: any;
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
  ) {}

  ngOnInit() {

    if (this.router.url.split("/")[1] == "admin") {
      this.userInfo = JSON.parse(localStorage.getItem("admin"));
      // this.getAdminMessages();
      let adminMessages = this.getAdminMessages();
      adminMessages.then();
      this.concatAdminMessages();
    } else {
      this.userInfo = this.authService.getCurrentUser();
      this.getCurrentUsersMessages()
      // this.check(this.userInfo.ProfileImage)
    }
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

  getCurrentUsersMessages() {
    this.userInfo = this.authService.getCurrentUser();
    var data = this.userInfo;
    this.messageService.getMessagesListOfCurrentUser(data).subscribe(data => {
      console.log("Current User All Messages ----> ", data.result);
      if (data.status == true) {
        this.currentUserMessages = data.result;
        this.messageConversationId = data.result[0].ConversationId;
        // console.log("Current User Message ---> ",this)
      }
    });
  }

  getAdminMessages(){
    return new Promise(function (resolve, reject) {
      this.messageService
        .getMessagesListOfCurrentUserAdmin("pilot")
        .subscribe(dataPilot => {
          if (dataPilot.status) {
            this.adminPilotMessages = dataPilot.result;
          } else {
            console.log("Unable to get admin and pilot messages")
          }
        });

      this.messageService
        .getMessagesListOfCurrentUserAdmin("customer")
        .subscribe(dataCustomer => {
          if (dataCustomer.status) {
            this.adminCustomerMessages = dataCustomer.result;
          } else {
            console.log("Unable to get admin and customer messages");
          }
        });

        if( this.adminPilotMessage && this.adminCustomerMessages ){
            resolve("Resolved");
        }else{
          reject("Rejectde");
        }
    });


    // console.log("DDDd", this.adminPilotMessages, this.adminCustomerMessages);
    //   this.adminAllMessages = this.adminPilotMessages.concat(this.adminCustomerMessages);
    //   console.log("sadasdasda ",this.adminAllMessages);
  }

  concatAdminMessages(){
    console.log("my word");
  }
}
