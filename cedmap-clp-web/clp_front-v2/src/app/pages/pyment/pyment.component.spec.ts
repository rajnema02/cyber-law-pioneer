import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PymentComponent } from './pyment.component';

describe('PymentComponent', () => {
  let component: PymentComponent;
  let fixture: ComponentFixture<PymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
