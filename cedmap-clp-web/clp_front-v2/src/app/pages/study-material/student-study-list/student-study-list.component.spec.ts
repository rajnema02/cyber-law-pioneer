import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentStudyListComponent } from './student-study-list.component';

describe('StudentStudyListComponent', () => {
  let component: StudentStudyListComponent;
  let fixture: ComponentFixture<StudentStudyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentStudyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentStudyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
