import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReScheduleExamFormComponent } from './re-schedule-exam-form.component';

describe('ReScheduleExamFormComponent', () => {
  let component: ReScheduleExamFormComponent;
  let fixture: ComponentFixture<ReScheduleExamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReScheduleExamFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReScheduleExamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
