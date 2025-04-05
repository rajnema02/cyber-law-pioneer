import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningProjectListComponent } from './running-project-list.component';

describe('RunningProjectListComponent', () => {
  let component: RunningProjectListComponent;
  let fixture: ComponentFixture<RunningProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunningProjectListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunningProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
