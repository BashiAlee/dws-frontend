import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { MessagesService } from '../../../services/messages/messages.service';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as _ from 'lodash';
import { config } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
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
  tabRole: any = 'pilot';
  currentRole: any;
  messageFromID: any;
  constructor(
    private messageService: MessagesService,
    private authService: AuthenticationService,
    private router: Router,
    private modalService: BsModalService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {


    this.userInfo = this.authService.getCurrentUser();
    if (this.router.url.split('/')[1] === 'user') {
      this.userType = 'PILOT';
      this.selectedSenderChatName = 'Admin';
      this.lastMessageDate = Date.now();
    } else {

      this.userType = 'ADMIN';
      this.route.queryParams.subscribe(params => {
        if (params.role == 'customer') {
          this.isPilotTab = false;
          this.messageFromID = parseInt(params.id);
          this.getMessagesByRole(params.role, this.messageFromID)
        } else if(params.role == 'pilot'){
          this.isPilotTab = true;
          this.messageFromID = parseInt(params.id);
          this.getMessagesByRole(params.role, this.messageFromID)
        }
      });

    }

    this.onPageLoadCommunication();

    // get online user data
    if (this.userType === 'PILOT') {
      // console.log('yhis is pilot', this.userType);

      var dataOnlineUser = this.authService.getCurrentUser();
      this.onlineUserId = dataOnlineUser.ID;
      this.currentRole = dataOnlineUser.Role;
    } else {
      // console.log('yhis is other', this.userType);

      var dataOnlineUser = this.authService.getCurrentAdmin();
      this.onlineUserId = dataOnlineUser.ID;
      this.currentRole = dataOnlineUser.Role;

    }

    // scrolling messages to bottom
    // var objDiv = document.getElementById('messages-scroll');
    // objDiv.scrollTop = objDiv.scrollHeight;

    // assigning active calss on feildfocus
    this.activeClass = false;
  }
  onPageLoadCommunication() {


    
    if (this.userType === 'PILOT') {
      this.messageService.getMessagesListOfCurrentUser(this.userInfo.ID).subscribe(data => {
        // console.log('Messages List ----> ', data.result);
        if (data.status === true) {
          this.currentUserMessages = data.result;
          this.selectedSenderChatName =
            data.result[0].SenderFirstName +
            ' ' +
            data.result[0].SenderMiddleName +
            ' ' +
            data.result[0].SenderLastName;
          // this.lastMessageDate = data.result[0].MessageTime;
          // console.log('date ',this.lastMessageDate)

          // this.lastMessageDate = data.result[0].MessageTime;
          // console.log('date ',this.lastMessageDate)


          this.getAllMessages(data.result[0]);
          this.messageConversationId = data.result[0].ConversationId;


        } else {
          // console.log('Messages Not recieved ', data.message);
        }
      });
    } else {
      // this.isPilotTab = true;
      this.userInfo = this.authService.getCurrentAdmin();
      var data = this.userInfo;
      this.messageService
        .getMessagesListOfCurrentUserAdmin(this.tabRole)
        .subscribe(data => {
          // console.log('Messages List ----> ', data.result);
          if (data.status === true && data.result) {
            this.currentUserMessages = data.result;
            if(this.messageFromID) {
              // console.log("SDFSDFSDF hereee----->>>", this.messageFromID);
              
      
             var temp =  this.currentUserMessages.filter(value => value.MessageTo == parseInt( this.messageFromID));
             this.selectedSenderChatName =
             temp[0].SenderFirstName +
             ' ' +
             temp[0].SenderMiddleName +
             ' ' +
             temp[0].SenderLastName;

           // this.lastMessageDate = temp[0].MessageTime;
           this.getAllMessages(temp[0]);
           // console.log('date ', data.result[0].MessageTime)
           this.messageConversationId = temp[0].ConversationId;
            } else {
                       this.selectedSenderChatName =
              data.result[0].SenderFirstName +
              ' ' +
              data.result[0].SenderMiddleName +
              ' ' +
              data.result[0].SenderLastName;

            // this.lastMessageDate = data.result[0].MessageTime;
            this.getAllMessages(data.result[0]);
            // console.log('date ', data.result[0].MessageTime)
            this.messageConversationId = data.result[0].ConversationId;
            }
         
            // this.selectedSenderChatName =
            //   data.result[0].SenderFirstName +
            //   ' ' +
            //   data.result[0].SenderMiddleName +
            //   ' ' +
            //   data.result[0].SenderLastName;

            // // this.lastMessageDate = data.result[0].MessageTime;
            // this.getAllMessages(data.result[0]);
            // // console.log('date ', data.result[0].MessageTime)
            // this.messageConversationId = data.result[0].ConversationId;
          } else {
            // console.log('Messages Not recieved ', data.message);
          }
        });
    }
  }

  getMessagesByRole(role, id?) {
   
    
    

    if (role === 'pilot') {
      this.currentUserMessages = [];
      this.lastMessageDate = '';
      this.messageConversationId = '';
      this.allMessagesByConversationId = [];
      this.selectedSenderChatName = '';
      this.isPilotTab = true;
      this.tabRole = role;
    } else {
      this.lastMessageDate = '';
      this.allMessagesByConversationId = [];
      this.selectedSenderChatName = '';
      this.currentUserMessages = [];
      this.messageConversationId = '';
      this.isPilotTab = false;
      this.tabRole = role;
    }
    this.userInfo = this.authService.getCurrentAdmin();
    // var data = this.userInfo;
    this.messageService
      .getMessagesListOfCurrentUserAdmin(this.tabRole)
      .subscribe(data => {
        // console.log('Messages List ----> ', data.result);
        if (data.status === true && data.result) {
          this.currentUserMessages = data.result;
          
            if(id) {
    
      
             var temp =  this.currentUserMessages.filter(value => value.MessageTo == parseInt( this.messageFromID));
             
             
             this.selectedSenderChatName =
             temp[0].SenderFirstName +
             ' ' +
             temp[0].SenderMiddleName +
             ' ' +
             temp[0].SenderLastName;

           // this.lastMessageDate = temp[0].MessageTime;
           this.getAllMessages(temp[0]);
           // console.log('date ', data.result[0].MessageTime)
           this.messageConversationId = temp[0].ConversationId;
            
          } else {
            this.selectedSenderChatName =
            data.result[0].SenderFirstName +
            ' ' +
            data.result[0].SenderMiddleName +
            ' ' +
            data.result[0].SenderLastName;
          // this.lastMessageDate = data.result[0].MessageTime;
          this.getAllMessages(data.result[0]);
          // console.log('date ', data.result[0].MessageTime)
          this.messageConversationId = data.result[0].ConversationId;
          }
        } else {
          // console.log('Messages Not recieved ', data.message);
        }
      });
  }

  getAllMessages(data) {

    var selectedConversationId = data.ConversationId;
    this.selectedSenderChatName =
      data.SenderFirstName +
      ' ' +
      data.SenderMiddleName +
      ' ' +
      data.SenderLastName;
    var role;
    if(this.isPilotTab) {
      role = 'pilot'
    } else if(!this.isPilotTab) {
      role = 'customer'
    }
    // this.router.navigate([], { 
    //   queryParams: {
    //     id: data.MessageTo,
    //     role: role
    //   }
    // });
    history.replaceState(null, null, 'admin/communication'+'?id='+data.MessageTo+'&role='+role);

    //
    // console.log(this.selectedSenderChatName);
    // console.log('Online User ---> ', this.authService.getCurrentUser());
    this.messageService
      .getAllMessagesByConversationId(selectedConversationId, this.onlineUserId)
      .subscribe(selectedConversationIdResult => {
        if (selectedConversationIdResult.status === true) {
          this.allMessagesByConversationId =
            selectedConversationIdResult.result;
          // console.log(this.allMessagesByConversationId)
          this.messageConversationId =
            selectedConversationIdResult.result[0].ConversationId;
          // this.lastMessageDate = selectedConversationIdResult.result[0].MessageTime;
          var lastMessage = _.last(this.allMessagesByConversationId);

          this.lastMessageDate = lastMessage.MessageTime;
          if (this.userType === 'ADMIN') {
            if (
              selectedConversationIdResult.result[0].MessageFrom !=
              this.onlineUserId
            ) {
              this.adminMessageToUserId =
                selectedConversationIdResult.result[0].MessageFrom;
              // console.log('id ',this.adminMessageToUserId);
              // console.log('chek ', this.selectedUser);
              this.selectedUser = '';
            } else {
              this.adminMessageToUserId =
                selectedConversationIdResult.result[0].MessageTo;
              // console.log('id to ', this.adminMessageToUserId);
              // console.log('chek to ', this.selectedUser);
              this.selectedUser = '';
            }
            if(document.getElementsByClassName('last')[0]) {
              // $( window ).scrollTo('.last')[0];
              // var objDiv = $(".last")[0];
              // var h = objDiv.get(0).scrollHeight;
              // objDiv.animate({scrollTop: h});
              // document.getElementsByClassName('last')[0].scrollIntoView();
            }
     
          }
        } else {
          // console.log(
          //   'Error Recieving Message ---> ',
          //   selectedConversationIdResult.message
          // );
        }
      });
  }

  sendMessage(message) {
    // if (event.keyCode === 13) {

    // }


    if (this.userType === 'PILOT') {
      var data = {
        MessageFrom: this.onlineUserId,
        Message: message
      };
      this.messageService.sendMessageToAdmin(data).subscribe(newData => {
        if (newData.status === true) {
          this.onPageLoadCommunication();
          this.message = '';
          this.activeClass = false;
          var elements = document.querySelectorAll('.mattie-scroll-container-div');
          var len = elements.length;
          // console.log('scroll');
          // console.log(elements);
          // console.log('asdasdas  ----> ', this.allMessagesByConversationId.length);
          // const el = elements[this.allMessagesByConversationId.length-1] as HTMLElement;

          // el.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
          // $(".mattie-scroll-container-div").scrollTop($('.mattie-scroll-container-div')[0].scrollHeight)

        } else {
          console.log('Message Not Sent ', newData.message);
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
        if (newData.status === true) {
          this.onPageLoadCommunication();
          this.message = '';
          this.activeClass = false;
          var elements = document.querySelectorAll('.mattie-scroll-container-div');
          var len = elements.length;
          // console.log('scroll');
          // console.log(elements.length);
          // console.log('asdasdas  ----> ',this.allMessagesByConversationId.length);
          // const el = elements[this.allMessagesByConversationId.length - 1] as HTMLElement;
          // el.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        } else {
          // console.log('Message Not Sent ', newData.message);
        }
      });
    }
  }

  selectUser(resultSearchedUser) {
    // console.log('Selected User ---> ', resultSearchedUser.FirstName);
    this.selectedSenderChatName =
      resultSearchedUser.FirstName +
      ' ' +
      resultSearchedUser.MiddleName +
      ' ' +
      resultSearchedUser.LastName;
    // console.log('Selected User ---> ', this.selectedSenderChatName);
    this.selectedUser = resultSearchedUser;
    this.modalRef.hide();
    this.modalRef = null;
    this.activeClass = true;
    this.allMessagesByConversationId = [];
    this.lastMessageDate = '';
  }

  startChat(template: TemplateRef<any>) {

    if (this.userType === 'PILOT') {

      // $('div.mainContent').animate({
      //   scrollTop: $('div.matti-body-input-div').offset().top
      // }, 1000)
      this.activeClass = true;
    } else {
      // console.log('current role ----> ',this.tabRole)
      this.modalRef = this.modalService.show(template);
      this.messageService.adminSearchUser(this.tabRole).subscribe(data => {
        if (data.status === true) {
          // console.log(data.result);
          this.resultSearchedUser = data.result;
        } else {
          console.log('Unable to find user ', data.message);
        }
      });
    }
  }

  adminSearchUser() {
    this.messageService.adminSearchUser(this.tabRole).subscribe(data => {
      if (data.status === true) {
        // console.log(data.result);
        this.resultSearchedUser = data.result;
      } else {
        console.log('Unable to find user ', data.message);
      }
    });
  }

  openCustomerMessages() {
    this.pilotMessages = false;
  }

  openPilotMessages() { }


  check(url) {
    return fetch(url)
      .then((data) => {
        return url;
      }).catch(err => {
        return '../../../../assets/images/avatar.png'
      })
    // this.authService.checkImageExists(url)
    // .subscribe(data => {
    //   console.log('DDD', data)
    //   return url;
    // }, err => {
    //   console.log('ERRRR')
    //  return '../../../../assets/images/avatar.png';
    // })
  }



}
