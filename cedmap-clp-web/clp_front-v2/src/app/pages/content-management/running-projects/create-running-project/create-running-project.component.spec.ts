import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRunningProjectComponent } from './create-running-project.component';

describe('CreateRunningProjectComponent', () => {
  let component: CreateRunningProjectComponent;
  let fixture: ComponentFixture<CreateRunningProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRunningProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRunningProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
