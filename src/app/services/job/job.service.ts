import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class JobService {

  apiUrl : any;
  staticUrl: any;
  constructor(private http: Http, private router: Router) {
      this.apiUrl = environment.apiURL;
      this.staticUrl = environment.uploadUrl;
   }
  saveJobInformation(data) {
    return this.http.post(this.apiUrl + 'job/newJob',data)
    .pipe(map((response: any) => {
     return response.json();
    }));
  }
  getAllJobs() {
    return this.http.post(this.apiUrl + 'job/jobList',"")
    .pipe(map((response: any) => {
     return response.json();
    }));
  }
}
