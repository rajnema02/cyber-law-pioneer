import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailsListComponent } from './service-details-list.component';

describe('ServiceDetailsListComponent', () => {
  let component: ServiceDetailsListComponent;
  let fixture: ComponentFixture<ServiceDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDetailsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
