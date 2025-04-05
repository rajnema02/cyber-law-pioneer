import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditQuestionnareListComponent } from './audit-questionnare-list.component';

describe('AuditQuestionnareListComponent', () => {
  let component: AuditQuestionnareListComponent;
  let fixture: ComponentFixture<AuditQuestionnareListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditQuestionnareListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditQuestionnareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
