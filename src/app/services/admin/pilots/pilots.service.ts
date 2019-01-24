import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { map } from "rxjs/operators";

import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class PilotService {
  apiUrl: any;
  staticUrl: any;
  constructor(private http: Http, private router: Router) {
    this.apiUrl = environment.apiURL;
    this.staticUrl = environment.uploadUrl;
  }

  getAllPilots(data) {
    return this.http
      .get(this.apiUrl + "admin/allPilots/" + data.from + "/" + data.to)
      .pipe(
        map((response: any) => {
          return response.json();
        })
      );
  }
  getAllApprovedPilots(data) {
    return this.http
      .get(this.apiUrl + "admin/approvedPilots/" + data.from + "/" + data.to)
      .pipe(
        map((response: any) => {
          return response.json();
        })
      );
  }
  getAllRejectedPilots(data) {
    return this.http
      .get(this.apiUrl + "admin/rejectedPilots/" + data.from + "/" + data.to)
      .pipe(
        map((response: any) => {
          return response.json();
        })
      );
  }

  approveProfile(id) {
    return this.http.get(this.apiUrl + "admin/approveProfile/" + id).pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }
  rejectProfile(id) {
    return this.http.get(this.apiUrl + "admin/rejectProfile/" + id).pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }

  getAllStates() {
    return this.http.get(this.apiUrl + "getAllStates").pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }

  searchPilotList(data) {
    return this.http.post(this.apiUrl + "admin/searchPilot", data).pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }

  getAllCountries() {
    return this.http.get(this.apiUrl + "getCountries").pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }
  updatePilotRating(data) {
    return this.http.post(this.apiUrl + "admin/updatePilotRating", data).pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }
  exportPilots(data) {
    return this.http.get(this.apiUrl + "admin/exportPilots/" + data).pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }
  assignedPilot(id) {
    return this.http.get(this.apiUrl + "job/AssignedPilot/" + id).pipe(
      map((response: any) => {
        return response.json();
      })
    );
  }
}
