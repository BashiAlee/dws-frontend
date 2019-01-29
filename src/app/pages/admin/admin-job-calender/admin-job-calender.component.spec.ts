import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJobCalenderComponent } from './admin-job-calender.component';

describe('AdminJobCalenderComponent', () => {
  let component: AdminJobCalenderComponent;
  let fixture: ComponentFixture<AdminJobCalenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminJobCalenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminJobCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
