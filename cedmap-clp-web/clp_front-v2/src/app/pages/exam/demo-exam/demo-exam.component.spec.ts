import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoExamComponent } from './demo-exam.component';

describe('DemoExamComponent', () => {
  let component: DemoExamComponent;
  let fixture: ComponentFixture<DemoExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoExamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
