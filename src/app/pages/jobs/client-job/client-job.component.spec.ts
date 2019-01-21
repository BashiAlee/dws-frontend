import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientJobComponent } from './client-job.component';

describe('ClientJobComponent', () => {
  let component: ClientJobComponent;
  let fixture: ComponentFixture<ClientJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
