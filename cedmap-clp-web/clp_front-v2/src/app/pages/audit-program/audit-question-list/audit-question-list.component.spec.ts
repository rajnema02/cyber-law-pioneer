import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditQuestionListComponent } from './audit-question-list.component';

describe('AuditQuestionListComponent', () => {
  let component: AuditQuestionListComponent;
  let fixture: ComponentFixture<AuditQuestionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditQuestionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditQuestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
