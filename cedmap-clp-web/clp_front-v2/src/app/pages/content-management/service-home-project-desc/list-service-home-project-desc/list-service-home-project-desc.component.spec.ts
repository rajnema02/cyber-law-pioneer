import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServiceHomeProjectDescComponent } from './list-service-home-project-desc.component';

describe('ListServiceHomeProjectDescComponent', () => {
  let component: ListServiceHomeProjectDescComponent;
  let fixture: ComponentFixture<ListServiceHomeProjectDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListServiceHomeProjectDescComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListServiceHomeProjectDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
