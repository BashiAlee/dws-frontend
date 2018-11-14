import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalsComponent } from '../../components/modals/modals.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  token: any;
  bsModalRef: BsModalRef;
  config = {
    class: "custom-modal modal-dialog-centered modal-lg successModal"
  };
  constructor(private authService: AuthenticationService, private modalService: BsModalService, private router: Router) { }

  ngOnInit() {
    var url_string = window.location.href; //window.location.href
    var url = new URL(url_string);
    this.token = url.searchParams.get("token");
    this.verifyToken(this.token)

  }

  verifyToken(token) {
    this.authService.verifyToken(token)
    .subscribe( data=> {
      if(data.status) {
        if (data.type == 'pilot'){
          this.router.navigate(["/loginpilot"]);
        }else{
          this.router.navigate(["/logincustomer"]);
        }

      } else if (!data.status) {
        const initialState = {
          type: 'error'
        }
        this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
        this.bsModalRef.content.closeBtnName = 'Close';
      }
    })
  }

}
