import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMessageListComponent } from './student-message-list.component';

describe('StudentMessageListComponent', () => {
  let component: StudentMessageListComponent;
  let fixture: ComponentFixture<StudentMessageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentMessageListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
