import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPartnerServiceDescProjectComponent } from './list-partner-service-desc-project.component';

describe('ListPartnerServiceDescProjectComponent', () => {
  let component: ListPartnerServiceDescProjectComponent;
  let fixture: ComponentFixture<ListPartnerServiceDescProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPartnerServiceDescProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPartnerServiceDescProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
