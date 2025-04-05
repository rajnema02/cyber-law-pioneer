import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchAllotmentComponent } from './batch-allotment.component';

describe('BatchAllotmentComponent', () => {
  let component: BatchAllotmentComponent;
  let fixture: ComponentFixture<BatchAllotmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchAllotmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
