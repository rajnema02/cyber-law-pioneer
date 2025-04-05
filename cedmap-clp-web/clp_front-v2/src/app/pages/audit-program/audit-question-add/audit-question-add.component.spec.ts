import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditQuestionAddComponent } from './audit-question-add.component';

describe('AuditQuestionAddComponent', () => {
  let component: AuditQuestionAddComponent;
  let fixture: ComponentFixture<AuditQuestionAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditQuestionAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditQuestionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
