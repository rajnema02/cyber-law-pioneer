import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePartnerServiceDescProjectComponent } from './create-partner-service-desc-project.component';

describe('CreatePartnerServiceDescProjectComponent', () => {
  let component: CreatePartnerServiceDescProjectComponent;
  let fixture: ComponentFixture<CreatePartnerServiceDescProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePartnerServiceDescProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePartnerServiceDescProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
