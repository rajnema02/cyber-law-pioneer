import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesHomeListComponent } from './services-home-list.component';

describe('ServicesHomeListComponent', () => {
  let component: ServicesHomeListComponent;
  let fixture: ComponentFixture<ServicesHomeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesHomeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesHomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
