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


  getAllMessagesByConversationId(data){
    return this.http
      .get(this.apiUrl + "pilot/allMessages/" + data)
      .pipe(
        map((response: any) => {
          return response.json();
        })
      );
  }

}
