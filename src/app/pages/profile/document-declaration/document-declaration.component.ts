
import { Component, TemplateRef ,OnInit} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
declare var $ : any;
@Component({
  selector: 'app-document-declaration',
  templateUrl: './document-declaration.component.html',
  styleUrls: ['./document-declaration.component.scss']
})
export class DocumentDeclarationComponent implements OnInit {
  selectedSuffix;
  modalRef: BsModalRef;
  isLiabilityInsurance: any;
  suffix = [
      { name: 'Jr.' },
      { name: 'Sr.' }
  ]
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg' })
    );
  }

}
