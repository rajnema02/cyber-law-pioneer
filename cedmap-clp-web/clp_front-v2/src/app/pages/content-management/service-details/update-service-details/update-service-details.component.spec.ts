import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateServiceDetailsComponent } from './update-service-details.component';

describe('UpdateServiceDetailsComponent', () => {
  let component: UpdateServiceDetailsComponent;
  let fixture: ComponentFixture<UpdateServiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateServiceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
