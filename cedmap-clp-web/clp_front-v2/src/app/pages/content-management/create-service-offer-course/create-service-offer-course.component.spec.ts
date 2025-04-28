import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceOfferCourseComponent } from './create-service-offer-course.component';

describe('CreateServiceOfferCourseComponent', () => {
  let component: CreateServiceOfferCourseComponent;
  let fixture: ComponentFixture<CreateServiceOfferCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServiceOfferCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceOfferCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
