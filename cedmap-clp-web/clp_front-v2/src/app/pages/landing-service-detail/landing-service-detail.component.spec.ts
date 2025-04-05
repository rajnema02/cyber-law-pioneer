import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingServiceDetailComponent } from './landing-service-detail.component';

describe('LandingServiceDetailComponent', () => {
  let component: LandingServiceDetailComponent;
  let fixture: ComponentFixture<LandingServiceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingServiceDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
