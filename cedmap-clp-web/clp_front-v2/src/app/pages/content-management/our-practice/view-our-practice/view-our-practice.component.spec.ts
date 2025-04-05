import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOurPracticeComponent } from './view-our-practice.component';

describe('ViewOurPracticeComponent', () => {
  let component: ViewOurPracticeComponent;
  let fixture: ComponentFixture<ViewOurPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOurPracticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOurPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
