import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  apiUrl: any;
  staticUrl: any;
  constructor(private http: Http, private router: Router) {
    this.apiUrl = environment.apiURL;
    this.staticUrl = environment.uploadUrl;
  }
  saveJobInformation(data) {
    return this.http.post(this.apiUrl + 'job/newJob', data).pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }
  getActiveJobs(data) {
    return this.http
      .get(this.apiUrl + 'job/activeJobs/' + data.from + '/' + data.to)
      .pipe(
        map((response: any) => {
          return response.json();
        })
      );
  }
  getQuotedJobs(data) {
    return this.http
      .get(this.apiUrl + 'job/quotedJobs/' + data.from + '/' + data.to)
      .pipe(
        map((response: any) => {
          return response.json();
        })
      );
  }
  getUserActiveJobs(id) {
    return this.http.get(this.apiUrl + 'job/userActiveJobs/' + id).pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }
  getUserQuotedJobs(id) {
    return this.http.get(this.apiUrl + 'job/userQuotedJobs/' + id).pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }
  getCurrentUserJobs(id) {
    return this.http.get(this.apiUrl + 'job/curentUserjobs/' + id).pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }
  getJobByID(id) {
    return this.http.get(this.apiUrl + 'job/getJob/' + id).pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }
  jobStatus(data) {
    return this.http.post(this.apiUrl + 'job/jobStatus', data).pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }
  adminJobStatus(data) {
    return this.http.post(this.apiUrl + 'job/adminJobStatus', data).pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }
  assignPolits(data) {
    return this.http.post(this.apiUrl + 'job/assignJob', data).pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }
  unAssignPolit(data) {
    return this.http.post(this.apiUrl + 'job/unAssignJob', data).pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }
  getAssignPolits(id) {
    return this.http.get(this.apiUrl + 'job/assignedPilots/' + id).pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }

  uploadClietFiles(file) {
    const formData = new FormData();
    const headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    formData.append('file', file, file.name);
    return this.http.post(this.staticUrl + 'uploadFile', formData)
      .pipe(map((response: any) => {

        return response.json();
      }));
  }
}
