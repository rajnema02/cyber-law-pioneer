import { TestBed } from '@angular/core/testing';

import { QuestionFieService } from './question-fie.service';

describe('QuestionFieService', () => {
  let service: QuestionFieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionFieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
