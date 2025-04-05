import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailListComponent } from './team-detail-list.component';

describe('TeamDetailListComponent', () => {
  let component: TeamDetailListComponent;
  let fixture: ComponentFixture<TeamDetailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamDetailListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
