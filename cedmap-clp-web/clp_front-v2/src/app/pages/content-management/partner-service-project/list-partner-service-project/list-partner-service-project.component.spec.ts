import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPartnerServiceProjectComponent } from './list-partner-service-project.component';

describe('ListPartnerServiceProjectComponent', () => {
  let component: ListPartnerServiceProjectComponent;
  let fixture: ComponentFixture<ListPartnerServiceProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPartnerServiceProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPartnerServiceProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
