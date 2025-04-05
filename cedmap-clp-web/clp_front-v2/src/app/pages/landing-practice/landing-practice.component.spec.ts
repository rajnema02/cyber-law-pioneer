import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPracticeComponent } from './landing-practice.component';

describe('LandingPracticeComponent', () => {
  let component: LandingPracticeComponent;
  let fixture: ComponentFixture<LandingPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPracticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
