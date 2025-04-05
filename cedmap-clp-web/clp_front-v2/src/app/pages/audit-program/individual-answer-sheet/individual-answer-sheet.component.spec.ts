import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualAnswerSheetComponent } from './individual-answer-sheet.component';

describe('IndividualAnswerSheetComponent', () => {
  let component: IndividualAnswerSheetComponent;
  let fixture: ComponentFixture<IndividualAnswerSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualAnswerSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualAnswerSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
