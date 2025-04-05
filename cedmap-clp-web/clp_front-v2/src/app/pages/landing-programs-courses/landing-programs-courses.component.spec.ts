import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingProgramsCoursesComponent } from './landing-programs-courses.component';

describe('LandingProgramsCoursesComponent', () => {
  let component: LandingProgramsCoursesComponent;
  let fixture: ComponentFixture<LandingProgramsCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingProgramsCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingProgramsCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
