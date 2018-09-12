import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperiencePortfolioComponent } from './experience-portfolio.component';

describe('ExperiencePortfolioComponent', () => {
  let component: ExperiencePortfolioComponent;
  let fixture: ComponentFixture<ExperiencePortfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperiencePortfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperiencePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
