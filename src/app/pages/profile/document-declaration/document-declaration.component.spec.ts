import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDeclarationComponent } from './document-declaration.component';

describe('DocumentDeclarationComponent', () => {
  let component: DocumentDeclarationComponent;
  let fixture: ComponentFixture<DocumentDeclarationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentDeclarationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
