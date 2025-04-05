import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAllotedComponent } from './student-alloted.component';

describe('StudentAllotedComponent', () => {
  let component: StudentAllotedComponent;
  let fixture: ComponentFixture<StudentAllotedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAllotedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentAllotedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
