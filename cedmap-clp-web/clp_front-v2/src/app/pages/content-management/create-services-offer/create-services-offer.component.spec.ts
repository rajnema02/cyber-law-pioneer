import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServicesOfferComponent } from './create-services-offer.component';

describe('CreateServicesOfferComponent', () => {
  let component: CreateServicesOfferComponent;
  let fixture: ComponentFixture<CreateServicesOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServicesOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServicesOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
