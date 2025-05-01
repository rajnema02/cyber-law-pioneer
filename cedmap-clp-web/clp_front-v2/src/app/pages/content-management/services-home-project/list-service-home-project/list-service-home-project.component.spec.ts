import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServiceHomeProjectComponent } from './list-service-home-project.component';

describe('ListServiceHomeProjectComponent', () => {
  let component: ListServiceHomeProjectComponent;
  let fixture: ComponentFixture<ListServiceHomeProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListServiceHomeProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListServiceHomeProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
