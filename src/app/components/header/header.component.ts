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
      this.getAdminMessages().then((data=>{

      })).catch(e =>{console.log("errrr",e)});
    } else {
      this.userInfo = this.authService.getCurrentUser();
      this.getCurrentUsersMessages()
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

  test(){
    console.log("tjis sadasdasdasdasdasd")
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
    var bool1: any;
    var bool2: any;
      let promise = new Promise((resolve, reject) => {
        this.messageService.getMessagesListOfCurrentUserAdmin("pilot")
        .subscribe(dataPilot => {
            if (dataPilot.status) {
              this.adminPilotMessages = dataPilot.result
              this.messageService.getMessagesListOfCurrentUserAdmin("customer")
              .subscribe(dataCustomer => {
                  if (dataCustomer.status) {
                    this.adminCustomerMessages = dataCustomer.result
                    resolve(this.adminAllMessages = this.adminPilotMessages.concat(this.adminCustomerMessages))
                  }
              });
            } else {
              this.messageService.getMessagesListOfCurrentUserAdmin("customer")
              .subscribe(dataCustomer => {
                  if (dataCustomer.status) {
                    this.adminCustomerMessages = dataCustomer.result
                    resolve(this.adminAllMessages = this.adminPilotMessages.concat(this.adminCustomerMessages))
                  }
              });
            }
        });





          // resolve(this.adminPilotMessages.concat(this.adminPilotMessages))


        // if(this.adminCustomerMessages.length && this.adminPilotMessages.length){
        //   resolve(this.adminPilotMessages.concat(this.adminPilotMessages));
        // }else{
        //   reject("Not Resolved")
        // }
    });

    let result = await promise; // wait till the promise resolves (*)

    console.log("billu",result); // "done!"
      // console.log("sadasdasda ",this.adminPilotMessages);
  }
}
