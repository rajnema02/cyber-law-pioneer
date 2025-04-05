import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOurPracticeComponent } from './create-our-practice.component';

describe('CreateOurPracticeComponent', () => {
  let component: CreateOurPracticeComponent;
  let fixture: ComponentFixture<CreateOurPracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOurPracticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOurPracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
