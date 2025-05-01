import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceHomeProjectComponent } from './create-service-home-project.component';

describe('CreateServiceHomeProjectComponent', () => {
  let component: CreateServiceHomeProjectComponent;
  let fixture: ComponentFixture<CreateServiceHomeProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServiceHomeProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceHomeProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
