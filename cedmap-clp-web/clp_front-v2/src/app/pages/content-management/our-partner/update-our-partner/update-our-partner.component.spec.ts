import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOurPartnerComponent } from './update-our-partner.component';

describe('UpdateOurPartnerComponent', () => {
  let component: UpdateOurPartnerComponent;
  let fixture: ComponentFixture<UpdateOurPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOurPartnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateOurPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
