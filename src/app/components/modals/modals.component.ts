import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap'
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { PilotService } from "../../services/admin/pilots/pilots.service";

@Component({
  selector: "custom-modals",
  templateUrl: "./modals.component.html",
  styleUrls: ["./modals.component.scss"]
})
export class ModalsComponent implements OnInit {
  type: string;
  closeBtnName: string;
  userInfo: any;
  config: any = {};
  max = 5;
  rate = 1;
  isReadonly = false;
  pilotRating:any;
  constructor(
    public bsModalRef: BsModalRef,
    private router: Router,
    private authService: AuthenticationService,
    private pilotService: PilotService
  ) {
    this.userInfo = this.authService.getCurrentUser();
  }
  resetStars() {
    this.rate = 0;
    this.isReadonly = false;
  }
  updateRating(rating) {
    console.log("this ins rating", rating);

    this.pilotRating = {
      UserId: this.userInfo.ID,
      Rating: rating,
    };
    this.pilotService.updatePilotRating(this.pilotRating).subscribe(data => {
      if (data.status) {
        console.log("this is rating",data);
      }
    });
  }
  ngOnInit() {
    // this.modalRef = this.modelServie.show('template');
  }

  moveToNextRoute(pageName, id) {
    this.router.navigate(["/user/profile/+" + id + "/" + pageName]);
    this.bsModalRef.hide();
  }

  movetoSignup() {
    this.router.navigate(["/signuppilot"]);
    this.bsModalRef.hide();
  }
  closeModal() {
    // BsModalRef.hide();
  }
  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modelServie.show(template);
  // }
}


