import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestUpdatesHomeComponent } from './latest-updates-home.component';

describe('LatestUpdatesHomeComponent', () => {
  let component: LatestUpdatesHomeComponent;
  let fixture: ComponentFixture<LatestUpdatesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestUpdatesHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestUpdatesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
