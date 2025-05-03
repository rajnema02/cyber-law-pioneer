import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPartnerProjectDescComponent } from './landing-partner-project-desc.component';

describe('LandingPartnerProjectDescComponent', () => {
  let component: LandingPartnerProjectDescComponent;
  let fixture: ComponentFixture<LandingPartnerProjectDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPartnerProjectDescComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPartnerProjectDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
