import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServicesHomeComponent } from './create-services-home.component';

describe('CreateServicesHomeComponent', () => {
  let component: CreateServicesHomeComponent;
  let fixture: ComponentFixture<CreateServicesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServicesHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServicesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
