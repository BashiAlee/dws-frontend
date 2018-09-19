import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment"

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  apiUrl : any;
  staticUrl: any;
  constructor(private http: Http) {
      this.apiUrl = environment.apiURL;
   }

   getCountries() {
    return this.http.get(this.apiUrl + 'getCountries')
    .pipe(map((response: any) => {
     return response.json();
    }));
  }
  getRegionByCode(code) {
    return this.http.get(this.apiUrl + 'getRegion/'+code)
    .pipe(map((response: any) => {
     return response.json();
    }));
  }

  getProfileInfoByID(id) {
    return this.http.get(this.apiUrl + 'personalInformation/'+id)
    .pipe(map((response: any) => {
     return response.json();
    }));
  }
}
