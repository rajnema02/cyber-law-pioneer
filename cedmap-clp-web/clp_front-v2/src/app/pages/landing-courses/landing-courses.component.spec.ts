import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingCoursesComponent } from './landing-courses.component';

describe('LandingCoursesComponent', () => {
  let component: LandingCoursesComponent;
  let fixture: ComponentFixture<LandingCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingCoursesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
