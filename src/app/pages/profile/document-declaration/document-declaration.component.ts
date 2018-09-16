import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-declaration',
  templateUrl: './document-declaration.component.html',
  styleUrls: ['./document-declaration.component.scss']
})
export class DocumentDeclarationComponent implements OnInit {
  selectedSuffix;
  suffix = [
      { name: 'Jr.' },
      { name: 'Sr.' }
  ]
  constructor() { }

  ngOnInit() {
  }

}
