import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingProgramComponent } from './landing-program.component';

describe('LandingProgramComponent', () => {
  let component: LandingProgramComponent;
  let fixture: ComponentFixture<LandingProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
