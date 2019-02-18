import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment"

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  apiUrl: any;
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
    return this.http.get(this.apiUrl + 'getStatesByCountries/' + id)
      .pipe(map((response: any) => {
        return response.json();
      }));
  }

  getProfilePersonalInfoByID(id) {
    return this.http.get(this.apiUrl + 'getPilotPersonalInformationById/' + id)
      .pipe(map((response: any) => {
        return response.json();
      }));
  }
  getProfileBusinessInfoByID(id) {
    return this.http.get(this.apiUrl + 'getPilotBusinessInformationById/' + id)
      .pipe(map((response: any) => {
        return response.json();
      }));
  }

  getPortfolioVideosImagesByID(id) {
    return this.http.get(this.apiUrl + 'getPortfolioVideosAndImages/' + id)
      .pipe(map((response: any) => {
        return response.json();
      }));
  }

  getExperiencePorfileWorkByID(id) {
    return this.http.get(this.apiUrl + 'getExperienceWorkPortfolio/' + id)
      .pipe(map((response: any) => {
        return response.json();
      }));
  }

  updatePersonalInformation(data) {
    return this.http.post(this.apiUrl + 'updatePilotPersonalInformationById', data)
      .pipe(map((response: any) => {
        return response.json();
      }));
  }
  updateBusinessInformation(data) {
    return this.http.post(this.apiUrl + 'updatePilotBusinessInformationById', data)
      .pipe(map((response: any) => {
        return response.json();
      }));
  }

  uploadProfilePicture(file) {
    let formData = new FormData();
    let headers = new Headers();
    var target = file.target || file.srcElement
    headers.append('Content-Type', 'multipart/form-data');

    formData.append('file', new Blob([target.files[0]]), target.files[0].name);

    return this.http.post(this.staticUrl + 'uploading', formData)
      .pipe(map((response: any) => {

        return response.json();
      }));
  }

  uploadCroppedImage(file, fileName) {

    let formData = new FormData();
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    formData.append('file', file, fileName);
    return this.http.post(this.staticUrl + 'uploading', formData)
      .pipe(map((response: any) => {

        return response.json();
      }));
  }

  getDronesByID(id) {
    return this.http.get(this.apiUrl + 'getDroneById/' + id)
      .pipe(map((response: any) => {
        return response.json();
      }));
  }
  getEquipmentsById(id) {
    return this.http.get(this.apiUrl + 'getEquipmentById/' + id)
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

  addProfilioImagesVideos(data) {
    return this.http.post(this.apiUrl + 'addPortfolioVideosAndImages', data)
      .pipe(map((response: any) => {
        return response.json();
      }));
  }

  updateExperienceWorkPortfolio(data) {
    return this.http.post(this.apiUrl + 'updateExperienceWorkPortfolio', data)
      .pipe(map((response: any) => {
        return response.json();
      }));
  }

  getWorkOfferedByID(id) {
    return this.http.get(this.apiUrl + 'getWorkOffered/' + id)
      .pipe(map((response: any) => {
        return response.json();
      }));
  }

  addWorkOffered(data) {
    return this.http.post(this.apiUrl + 'addWorkOffered', data)
      .pipe(map((response: any) => {
        return response.json();
      }));
  }

  addWaiver(data) {
    return this.http.post(this.apiUrl + 'addWaiver', data)
      .pipe(map((response: any) => {
        return response.json();
      }));
  }

  uploadPDF(file) {
    let formData = new FormData();
    let headers = new Headers();
    var target = file.target || file.srcElement
    headers.append('Content-Type', 'multipart/form-data');

    formData.append('file', new Blob([target.files[0]]), target.files[0].name);

    return this.http.post(this.staticUrl + 'uploading', formData)
      .pipe(map((response: any) => {

        return response.json();
      }));
  }

  getProfileDocumentsByID(id) {
    return this.http.get(this.apiUrl + 'getDocumenatation/' + id)
      .pipe(map((response: any) => {
        return response.json();
      }));
  }

  getDocumentsWaiversByID(id) {
    return this.http.get(this.apiUrl + 'getWaiver/' + id)
      .pipe(map((response: any) => {
        return response.json();
      }));
  }

  updateDocumentation(data) {
    return this.http.post(this.apiUrl + 'updateDocumenatation', data)
      .pipe(map((response: any) => {
        return response.json();
      }));
  }

  updateEquipmentNotes(data) {
    return this.http.post(this.apiUrl + 'updateNotes', data)
      .pipe(map((response: any) => {
        return response.json();
      }));
  }

  deleteDroneById(id) {
    return this.http.delete(this.apiUrl + 'deleteDroneById/' + id)
      .pipe(map((response: any) => {
        return response.json();
      }));
  }

  deleteEquipmentById(id) {
    return this.http.delete(this.apiUrl + 'deleteEquipmentById/' + id)
      .pipe(map((response: any) => {
        return response.json();
      }));
  }
  deletePortfolioVideosAndImages(id) {
    return this.http.delete(this.apiUrl + 'deletePortfolioVideosAndImages/' + id)
      .pipe(map((response: any) => {
        return response.json();
      }));
  }

  updatePortfolioVideosAndImages(data) {
    return this.http.post(this.apiUrl + 'updatePortfolioVideosAndImages', data)
      .pipe(map((response: any) => {
        return response.json();
      }));
  }


}
