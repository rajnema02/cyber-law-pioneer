import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServiceHomeProjectDescComponent } from './create-service-home-project-desc.component';

describe('CreateServiceHomeProjectDescComponent', () => {
  let component: CreateServiceHomeProjectDescComponent;
  let fixture: ComponentFixture<CreateServiceHomeProjectDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServiceHomeProjectDescComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServiceHomeProjectDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
