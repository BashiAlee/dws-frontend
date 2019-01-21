import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PilotJobListComponent } from './pilot-job-list.component';

describe('PilotJobListComponent', () => {
  let component: PilotJobListComponent;
  let fixture: ComponentFixture<PilotJobListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PilotJobListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PilotJobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
