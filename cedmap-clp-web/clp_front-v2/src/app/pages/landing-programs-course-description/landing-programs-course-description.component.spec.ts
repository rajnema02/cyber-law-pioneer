import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingProgramsCourseDescriptionComponent } from './landing-programs-course-description.component';

describe('LandingProgramsCourseDescriptionComponent', () => {
  let component: LandingProgramsCourseDescriptionComponent;
  let fixture: ComponentFixture<LandingProgramsCourseDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingProgramsCourseDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingProgramsCourseDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
