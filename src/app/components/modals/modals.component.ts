import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap'
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';





@Component({
  selector: 'custom-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {
  type: string;
  closeBtnName: string;
  config: any = {};

  constructor(public bsModalRef: BsModalRef, private router: Router, private authService: AuthenticationService) {

   }

  ngOnInit() {
   
    // this.modalRef = this.modelServie.show('template');
  }

  moveToNextRoute(pageName, id) {

    this.router.navigate(['/user/profile/+'+id+'/'+pageName]);
    this.bsModalRef.hide();
  }

  movetoSignup() {
    this.router.navigate(['/signuppilot']);
    this.bsModalRef.hide();
  }
  closeModal() {
    // BsModalRef.hide();
  }
  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modelServie.show(template);
  // }
}


