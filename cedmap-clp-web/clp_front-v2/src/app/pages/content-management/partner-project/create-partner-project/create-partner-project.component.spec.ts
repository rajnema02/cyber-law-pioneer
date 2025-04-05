import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePartnerProjectComponent } from './create-partner-project.component';

describe('CreatePartnerProjectComponent', () => {
  let component: CreatePartnerProjectComponent;
  let fixture: ComponentFixture<CreatePartnerProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePartnerProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePartnerProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
