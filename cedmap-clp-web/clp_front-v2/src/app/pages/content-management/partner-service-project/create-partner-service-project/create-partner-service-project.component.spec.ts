import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePartnerServiceProjectComponent } from './create-partner-service-project.component';

describe('CreatePartnerServiceProjectComponent', () => {
  let component: CreatePartnerServiceProjectComponent;
  let fixture: ComponentFixture<CreatePartnerServiceProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePartnerServiceProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePartnerServiceProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
