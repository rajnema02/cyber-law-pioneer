import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingServiceProjectDescComponent } from './landing-service-project-desc.component';

describe('LandingServiceProjectDescComponent', () => {
  let component: LandingServiceProjectDescComponent;
  let fixture: ComponentFixture<LandingServiceProjectDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingServiceProjectDescComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingServiceProjectDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
