import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Http } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class MessagesService {
  apiUrl: any;
  staticUrl: any;
  constructor(private http: Http) {
    this.apiUrl = environment.apiURL;
    this.staticUrl = environment.uploadUrl;
  }

  getMessagesListOfCurrentUser(data){
    return this.http
      .get(this.apiUrl + "pilot/listMessage/" + data.ID)
      .pipe(
        map((response: any) => {
          return response.json();
        })
      );
  }

  getMessagesListOfCurrentUserAdmin(role) {
    return this.http
      .get(this.apiUrl + "admin/listMessage/"+role)
      .pipe(
        map((response: any) => {
          return response.json();
        })
      );
  }


  getAllMessagesByConversationId(data,userid){
    return this.http
      .get(this.apiUrl + "pilot/allMessages/" + data+ "/" +userid)
      .pipe(
        map((response: any) => {
          return response.json();
        })
      );
  }

  sendMessageToAdmin(data){
    return this.http.post(this.apiUrl + 'pilot/messageAdmin', data)
      .pipe(map((response: any) => {
        return response.json();
      }));
  }

  sendMessageToUser(data){
    return this.http
      .post(this.apiUrl + "admin/messagePilot", data)
      .pipe(
        map((response: any) => {
          return response.json();
        })
      );
  }

  adminSearchUser(){
    return this.http
      .get(this.apiUrl + "admin/getAllUsers")
      .pipe(
        map((response: any) => {
          return response.json();
        })
      );
  }

}
