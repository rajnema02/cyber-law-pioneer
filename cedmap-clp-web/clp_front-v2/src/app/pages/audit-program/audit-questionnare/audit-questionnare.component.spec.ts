import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditQuestionnareComponent } from './audit-questionnare.component';

describe('AuditQuestionnareComponent', () => {
  let component: AuditQuestionnareComponent;
  let fixture: ComponentFixture<AuditQuestionnareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditQuestionnareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditQuestionnareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
