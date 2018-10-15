import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Router } from '@angular/router';





@Component({
  selector: 'custom-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent implements OnInit {
  type: string;
  closeBtnName: string;
  config: any = {};

  constructor(public bsModalRef: BsModalRef, private router: Router) {

   }

  ngOnInit() {
   
    // this.modalRef = this.modelServie.show('template');
  }

  moveToNextRoute(pageName, id) {

    this.router.navigate(['/user/profile/+'+id+'/'+pageName]);
    this.bsModalRef.hide();
  }
  closeModal() {
    // BsModalRef.hide();
  }
  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modelServie.show(template);
  // }

}
