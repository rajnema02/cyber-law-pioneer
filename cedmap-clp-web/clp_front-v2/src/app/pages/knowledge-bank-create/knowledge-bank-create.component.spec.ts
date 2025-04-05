import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnowledgeBankCreateComponent } from './knowledge-bank-create.component';

describe('KnowledgeBankCreateComponent', () => {
  let component: KnowledgeBankCreateComponent;
  let fixture: ComponentFixture<KnowledgeBankCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KnowledgeBankCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KnowledgeBankCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
