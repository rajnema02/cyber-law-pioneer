import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPartnerProjectComponent } from './landing-partner-project.component';

describe('LandingPartnerProjectComponent', () => {
  let component: LandingPartnerProjectComponent;
  let fixture: ComponentFixture<LandingPartnerProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPartnerProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPartnerProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
