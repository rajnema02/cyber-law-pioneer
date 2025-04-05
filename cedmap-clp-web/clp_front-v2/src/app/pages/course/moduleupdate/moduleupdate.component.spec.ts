import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleupdateComponent } from './moduleupdate.component';

describe('ModuleupdateComponent', () => {
  let component: ModuleupdateComponent;
  let fixture: ComponentFixture<ModuleupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
