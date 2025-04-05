import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesOfferListComponent } from './services-offer-list.component';

describe('ServicesOfferListComponent', () => {
  let component: ServicesOfferListComponent;
  let fixture: ComponentFixture<ServicesOfferListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesOfferListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesOfferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
