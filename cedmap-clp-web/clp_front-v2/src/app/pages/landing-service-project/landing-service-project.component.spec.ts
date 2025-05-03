import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingServiceProjectComponent } from './landing-service-project.component';

describe('LandingServiceProjectComponent', () => {
  let component: LandingServiceProjectComponent;
  let fixture: ComponentFixture<LandingServiceProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingServiceProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingServiceProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
