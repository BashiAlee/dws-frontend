import { MessagesService } from './../../services/messages/messages.service';
import { CommunicationComponent } from './../../pages/admin/communication/communication.component';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userInfo: any;
  isAdmin: any;
  currentUserMessages: any = [];
  messageConversationId: any;

  constructor(private authService: AuthenticationService, private router: Router, private messageService: MessagesService) { }

  ngOnInit() {
    if(this.router.url.split('/')[1]=='admin') {
      this.userInfo = JSON.parse(localStorage.getItem('admin'));
    } else {

      this.userInfo = this.authService.getCurrentUser();
      // this.check(this.userInfo.ProfileImage)
    }

  }

  check(url) {
    this.authService.checkImageExists(url)
    .subscribe(data =>{
      this.userInfo.ProfileImage = url;
    },
    err => {
      this.userInfo.ProfileImage = "";
    })
  }

  getCurrentUsersMessages(){
    this.userInfo = this.authService.getCurrentUser();
    var data = this.userInfo;
    this.messageService.getMessagesListOfCurrentUser(data).subscribe(data => {
      // console.log("Messages List ----> ", data.result);
      if (data.status == true) {
        this.currentUserMessages = data.result;
        this.messageConversationId = data.result[0].ConversationId;
      }
    });
  }
}
