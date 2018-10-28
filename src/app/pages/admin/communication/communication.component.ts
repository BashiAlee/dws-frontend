import { Component, OnInit } from '@angular/core';
import { MessagesService } from "../../../services/messages/messages.service";
import { AuthenticationService } from "../../../services/authentication/authentication.service";
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
  constructor(
    private messageService: MessagesService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.onPageLoadCommunication();
  }
  onPageLoadCommunication() {
    this.userInfo = this.authService.getCurrentUser();
    var data = this.userInfo;
    this.messageService.getMessagesListOfCurrentUser(data).subscribe(data => {
      console.log("Messages List ----> ", data.result);
      this.currentUserMessages = data.result;
      this.selectedSenderChatName =
        data.result[0].SenderFirstName +
        " " +
        data.result[0].SenderMiddleName +
        " " +
        data.result[0].SenderLastName;
      this.getAllMessages(data.result[0]);
      // console.log("name ---> ", this.selectedSenderChatName);
    });
  }

  getAllMessages(data) {
    // console.log(data.ConversationId)
    var selectedConversationId = data.ConversationId;
    this.selectedSenderChatName =
      data.SenderFirstName +
      " " +
      data.SenderMiddleName +
      " " +
      data.SenderLastName;
    // console.log("name ---> ",this.selectedSenderChatName);
    console.log("Online User ---> ", this.authService.getCurrentUser());
    var dataOnlineUser = this.authService.getCurrentUser();
    this.onlineUserId = dataOnlineUser.ID;
    this.messageService
      .getAllMessagesByConversationId(selectedConversationId)
      .subscribe(selectedConversationId => {
        console.log("all messages ----> ", selectedConversationId.result);
        this.allMessagesByConversationId = selectedConversationId.result;
      });
  }

  sendMessage(message){
    console.log("message to send ----> ",message)
  }
}
