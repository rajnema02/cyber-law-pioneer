import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLatestUpdatesComponent } from './create-latest-updates.component';

describe('CreateLatestUpdatesComponent', () => {
  let component: CreateLatestUpdatesComponent;
  let fixture: ComponentFixture<CreateLatestUpdatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLatestUpdatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLatestUpdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
