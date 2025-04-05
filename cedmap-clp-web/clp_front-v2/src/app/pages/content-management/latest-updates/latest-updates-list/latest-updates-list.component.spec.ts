import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestUpdatesListComponent } from './latest-updates-list.component';

describe('LatestUpdatesListComponent', () => {
  let component: LatestUpdatesListComponent;
  let fixture: ComponentFixture<LatestUpdatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestUpdatesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestUpdatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
