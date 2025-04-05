import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOurPartnerComponent } from './create-our-partner.component';

describe('CreateOurPartnerComponent', () => {
  let component: CreateOurPartnerComponent;
  let fixture: ComponentFixture<CreateOurPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOurPartnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOurPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
