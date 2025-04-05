import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchAddressComponent } from './batch-address.component';

describe('BatchAddressComponent', () => {
  let component: BatchAddressComponent;
  let fixture: ComponentFixture<BatchAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
