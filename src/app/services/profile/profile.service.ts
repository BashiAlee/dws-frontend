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
      this.staticUrl = environment.uploadUrl;
   }

   getCountries() {
    return this.http.get(this.apiUrl + 'getCountries')
    .pipe(map((response: any) => {
     return response.json();
    }));
  }
  getStatesByCode(id) {
    return this.http.get(this.apiUrl + 'getStatesByCountries/'+id)
    .pipe(map((response: any) => {
     return response.json();
    }));
  }

  getProfilePersonalInfoByID(id) {
    return this.http.get(this.apiUrl + 'getPilotPersonalInformationById/'+id)
    .pipe(map((response: any) => {
     return response.json();
    }));
  }

  updatePersonalInformation(data) {
    return this.http.post(this.apiUrl + 'updatePilotPersonalInformationById',data)
    .pipe(map((response: any) => {
     return response.json();
    }));
  }

  uploadProfilePicture(file) {
    let formData = new FormData();
    let headers = new Headers();
    var target = file.target || file.srcElement
    headers.append('Content-Type','multipart/form-data');
    
    formData.append('file',new Blob([target.files[0]]),target.files[0].name);

    return this.http.post(this.staticUrl+'uploading',formData)
    .pipe(map((response: any) => {
  
     return response.json();
  }));
  }

  getDronesByID(id) {
    return this.http.get(this.apiUrl + 'getDroneById/'+id)
    .pipe(map((response: any) => {
     return response.json();
    }));
  }
  getEquipmentsById(id) {
    return this.http.get(this.apiUrl + 'getEquipmentById/'+id)
    .pipe(map((response: any) => {
     return response.json();
    }));
  }

  addNewPilotEquipment(data) {
    return this.http.post(this.apiUrl + 'addEquipment', data)
    .pipe(map((response: any) => {
     return response.json();
    }));
  }
  addNewPilotDrone(data) {
    return this.http.post(this.apiUrl + 'addDrone', data)
    .pipe(map((response: any) => {
     return response.json();
    }));
  }

  updatePilotDrone(data) {
    return this.http.post(this.apiUrl + 'updateDroneById', data)
    .pipe(map((response: any) => {
     return response.json();
    }));
  }
  updatePilotEquipment(data) {
    return this.http.post(this.apiUrl + 'updateEquipmentById', data)
    .pipe(map((response: any) => {
     return response.json();
    }));
  }
}
