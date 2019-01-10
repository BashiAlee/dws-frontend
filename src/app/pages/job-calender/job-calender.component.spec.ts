import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCalenderComponent } from './job-calender.component';

describe('JobCalenderComponent', () => {
  let component: JobCalenderComponent;
  let fixture: ComponentFixture<JobCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
