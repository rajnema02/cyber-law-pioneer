import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurPartnerListComponent } from './our-partner-list.component';

describe('OurPartnerListComponent', () => {
  let component: OurPartnerListComponent;
  let fixture: ComponentFixture<OurPartnerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurPartnerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurPartnerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
