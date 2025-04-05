import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceDetailsComponent } from './create-service-details.component';

describe('CreateServiceDetailsComponent', () => {
  let component: CreateServiceDetailsComponent;
  let fixture: ComponentFixture<CreateServiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServiceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
