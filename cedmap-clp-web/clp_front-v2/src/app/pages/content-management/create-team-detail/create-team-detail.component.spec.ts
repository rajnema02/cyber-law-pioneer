import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTeamDetailComponent } from './create-team-detail.component';

describe('CreateTeamDetailComponent', () => {
  let component: CreateTeamDetailComponent;
  let fixture: ComponentFixture<CreateTeamDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTeamDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTeamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
