import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurPracticeListComponent } from './our-practice-list.component';

describe('OurPracticeListComponent', () => {
  let component: OurPracticeListComponent;
  let fixture: ComponentFixture<OurPracticeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurPracticeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurPracticeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
