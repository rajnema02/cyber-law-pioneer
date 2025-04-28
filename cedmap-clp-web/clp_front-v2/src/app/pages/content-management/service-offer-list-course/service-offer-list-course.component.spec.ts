import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOfferListCourseComponent } from './service-offer-list-course.component';

describe('ServiceOfferListCourseComponent', () => {
  let component: ServiceOfferListCourseComponent;
  let fixture: ComponentFixture<ServiceOfferListCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceOfferListCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceOfferListCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
