import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCandicateComponent } from './verify-candicate.component';

describe('VerifyCandicateComponent', () => {
  let component: VerifyCandicateComponent;
  let fixture: ComponentFixture<VerifyCandicateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyCandicateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyCandicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
