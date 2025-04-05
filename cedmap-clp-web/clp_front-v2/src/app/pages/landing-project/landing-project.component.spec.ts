import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingProjectComponent } from './landing-project.component';

describe('LandingProjectComponent', () => {
  let component: LandingProjectComponent;
  let fixture: ComponentFixture<LandingProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
