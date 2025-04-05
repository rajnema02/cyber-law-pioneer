import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditQuestionnareListViewComponent } from './audit-questionnare-list-view.component';

describe('AuditQuestionnareListViewComponent', () => {
  let component: AuditQuestionnareListViewComponent;
  let fixture: ComponentFixture<AuditQuestionnareListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditQuestionnareListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditQuestionnareListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
