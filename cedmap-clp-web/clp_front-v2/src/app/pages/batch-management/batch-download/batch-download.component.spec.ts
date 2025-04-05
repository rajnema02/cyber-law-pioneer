import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchDownloadComponent } from './batch-download.component';

describe('BatchDownloadComponent', () => {
  let component: BatchDownloadComponent;
  let fixture: ComponentFixture<BatchDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchDownloadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
