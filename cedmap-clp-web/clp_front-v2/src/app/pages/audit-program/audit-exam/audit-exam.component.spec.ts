import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditExamComponent } from './audit-exam.component';

describe('AuditExamComponent', () => {
  let component: AuditExamComponent;
  let fixture: ComponentFixture<AuditExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditExamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
