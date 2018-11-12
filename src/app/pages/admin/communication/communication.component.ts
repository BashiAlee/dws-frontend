import { Component, OnInit, TemplateRef} from '@angular/core';
import { Router } from "@angular/router";
import { BsModalService } from "ngx-bootstrap/modal";
import { MessagesService } from "../../../services/messages/messages.service";
import { AuthenticationService } from "../../../services/authentication/authentication.service";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import * as _ from "lodash";

@Component({
  selector: "app-communication",
  templateUrl: "./communication.component.html",
  styleUrls: ["./communication.component.scss"]
})
export class CommunicationComponent implements OnInit {
  userInfo: any;
  currentUserMessages: any = [];
  selectedConversationId: any;
  allMessagesByConversationId: any;
  selectedSenderChatName: any;
  onlineUserId: any;
  message: any;
  messageConversationId: any;
  activeClass: any;
  userType: any;
  modalRef: BsModalRef;
  searchUser: any;
  searchPilot: any;
  resultSearchedUser: any = [];
  selectedUser: any;
  adminMessageToUserId: any;
  lastMessageDate: any;
  pilotMessages: any;
  isPilotTab: any = true;
  tabRole: any = "pilot";

  constructor(
    private messageService: MessagesService,
    private authService: AuthenticationService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    if (this.router.url.split("/")[1] == "user") {
      this.userType = "PILOT";
    } else {
      this.userType = "ADMIN";
    }
    this.onPageLoadCommunication();

    //get online user data
    if (this.userType == "PILOT") {
      var dataOnlineUser = this.authService.getCurrentUser();
      this.onlineUserId = dataOnlineUser.ID;
    } else {
      var dataOnlineUser = this.authService.getCurrentAdmin();
      this.onlineUserId = dataOnlineUser.ID;
    }

    //scrolling messages to bottom
    var objDiv = document.getElementById("messages-scroll");
    objDiv.scrollTop = objDiv.scrollHeight;

    //assigning active calss on feildfocus
    this.activeClass = false;
  }
  onPageLoadCommunication() {
    if (this.userType == "PILOT") {
      this.userInfo = this.authService.getCurrentUser();
      var data = this.userInfo;
      this.messageService.getMessagesListOfCurrentUser(data).subscribe(data => {
        // console.log("Messages List ----> ", data.result);
        if (data.status == true) {
          this.currentUserMessages = data.result;
          this.selectedSenderChatName =
            data.result[0].SenderFirstName +
            " " +
            data.result[0].SenderMiddleName +
            " " +
            data.result[0].SenderLastName;
          // this.lastMessageDate = data.result[0].MessageTime;
          // console.log("date ",this.lastMessageDate)
          this.getAllMessages(data.result[0]);
          this.messageConversationId = data.result[0].ConversationId;
        } else {
          console.log("Messages Not recieved ", data.message);
        }
      });
    } else {
      // this.isPilotTab = true;
      this.userInfo = this.authService.getCurrentAdmin();
      var data = this.userInfo;
      this.messageService
        .getMessagesListOfCurrentUserAdmin(this.tabRole)
        .subscribe(data => {
          // console.log("Messages List ----> ", data.result);
          if (data.status == true && data.result) {
            this.currentUserMessages = data.result;
            this.selectedSenderChatName =
              data.result[0].SenderFirstName +
              " " +
              data.result[0].SenderMiddleName +
              " " +
              data.result[0].SenderLastName;
            // this.lastMessageDate = data.result[0].MessageTime;
            this.getAllMessages(data.result[0]);
            // console.log("date ", data.result[0].MessageTime)
            this.messageConversationId = data.result[0].ConversationId;
          } else {
            console.log("Messages Not recieved ", data.message);
          }
        });
    }
  }

  getMessagesByRole(role){
    if(role=='pilot'){
      this.isPilotTab = true;
      this.tabRole = role;
    }else{
      this.isPilotTab = false;
      this.tabRole = role;
    }
    this.userInfo = this.authService.getCurrentAdmin();
    var data = this.userInfo;
    this.messageService
      .getMessagesListOfCurrentUserAdmin(this.tabRole)
      .subscribe(data => {
        // console.log("Messages List ----> ", data.result);
        if (data.status == true && data.result) {
          this.currentUserMessages = data.result;
          this.selectedSenderChatName =
            data.result[0].SenderFirstName +
            " " +
            data.result[0].SenderMiddleName +
            " " +
            data.result[0].SenderLastName;
          // this.lastMessageDate = data.result[0].MessageTime;
          this.getAllMessages(data.result[0]);
          // console.log("date ", data.result[0].MessageTime)
          this.messageConversationId = data.result[0].ConversationId;
        } else {
          console.log("Messages Not recieved ", data.message);
        }
      });
  }

  getAllMessages(data) {
    var selectedConversationId = data.ConversationId;
    this.selectedSenderChatName =
      data.SenderFirstName +
      " " +
      data.SenderMiddleName +
      " " +
      data.SenderLastName;
    //
    console.log(this.selectedSenderChatName);
    // console.log("Online User ---> ", this.authService.getCurrentUser());
    this.messageService
      .getAllMessagesByConversationId(selectedConversationId, this.onlineUserId)
      .subscribe(selectedConversationIdResult => {
        if (selectedConversationIdResult.status == true) {
          this.allMessagesByConversationId =
            selectedConversationIdResult.result;
          // console.log(this.allMessagesByConversationId)
          this.messageConversationId =
            selectedConversationIdResult.result[0].ConversationId;
          // this.lastMessageDate = selectedConversationIdResult.result[0].MessageTime;
          var lastMessage = _.last(this.allMessagesByConversationId);
          this.lastMessageDate = lastMessage.MessageTime;
          if (this.userType == "ADMIN") {
            if (
              selectedConversationIdResult.result[0].MessageFrom !=
              this.onlineUserId
            ) {
              this.adminMessageToUserId =
                selectedConversationIdResult.result[0].MessageFrom;
              // console.log("id ",this.adminMessageToUserId);
              // console.log("chek ", this.selectedUser);
              this.selectedUser = "";
            } else {
              this.adminMessageToUserId =
                selectedConversationIdResult.result[0].MessageTo;
              // console.log("id to ", this.adminMessageToUserId);
              // console.log("chek to ", this.selectedUser);
              this.selectedUser = "";
            }
          }
        } else {
          console.log(
            "Error Recieving Message ---> ",
            selectedConversationIdResult.message
          );
        }
      });
  }

  sendMessage(message = "") {
    if (this.userType == "PILOT") {
      var data = {
        MessageFrom: this.onlineUserId,
        Message: message
      };
      this.messageService.sendMessageToAdmin(data).subscribe(newData => {
        if (newData.status == true) {
          this.onPageLoadCommunication();
          this.message = "";
          this.activeClass = false;
        } else {
          console.log("Message Not Sent ", newData.message);
        }
      });
    } else {
      if (this.selectedUser) {
        var messageData = {
          MessageFrom: this.selectedUser.ID,
          Message: message
        };
      } else {
        var messageData = {
          MessageFrom: this.adminMessageToUserId,
          Message: message
        };
      }
      this.messageService.sendMessageToUser(messageData).subscribe(newData => {
        if (newData.status == true) {
          this.onPageLoadCommunication();
          this.message = "";
          this.activeClass = false;
          var element = document.getElementById("messages-scroll");
          element.scrollTop = element.scrollHeight;
          // console.log("Scroll top ",element.scrollTop);
        } else {
          console.log("Message Not Sent ", newData.message);
        }
      });
    }
  }

  selectUser(resultSearchedUser) {
    console.log("Selected User ---> ", resultSearchedUser.FirstName);
    this.selectedSenderChatName =
      resultSearchedUser.FirstName +
      " " +
      resultSearchedUser.MiddleName +
      " " +
      resultSearchedUser.LastName;
    console.log("Selected User ---> ", this.selectedSenderChatName);
    this.selectedUser = resultSearchedUser;
    this.modalRef.hide();
    this.modalRef = null;
    this.activeClass = true;
    this.allMessagesByConversationId = [];
    this.lastMessageDate = "";
  }

  stratChat(template: TemplateRef<any>) {
    if (this.userType == "PILOT") {
      this.activeClass = true;
    } else {
      this.modalRef = this.modalService.show(template);
      this.messageService.adminSearchUser().subscribe(data => {
        if (data.status == true) {
          // console.log(data.result);
          this.resultSearchedUser = data.result;
        } else {
          console.log("Unable to find user ", data.message);
        }
      });
    }
  }

  adminSearchUser() {
    this.messageService.adminSearchUser().subscribe(data => {
      if (data.status == true) {
        // console.log(data.result);
        this.resultSearchedUser = data.result;
      } else {
        console.log("Unable to find user ", data.message);
      }
    });
  }

  openCustomerMessages() {
    this.pilotMessages = false;
  }

  openPilotMessages() {}
}
