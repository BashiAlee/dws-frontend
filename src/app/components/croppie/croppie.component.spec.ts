import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CroppieComponent } from './croppie.component';

describe('CroppieComponent', () => {
  let component: CroppieComponent;
  let fixture: ComponentFixture<CroppieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CroppieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CroppieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
