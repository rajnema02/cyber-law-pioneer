import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerProjectListComponent } from './partner-project-list.component';

describe('PartnerProjectListComponent', () => {
  let component: PartnerProjectListComponent;
  let fixture: ComponentFixture<PartnerProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerProjectListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
