import { TestBed, inject } from '@angular/core/testing';

import { CheckedDocumentsService } from './checked-documents.service';

describe('CheckedDocumentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckedDocumentsService]
    });
  });

  it('should be created', inject([CheckedDocumentsService], (service: CheckedDocumentsService) => {
    expect(service).toBeTruthy();
  }));
});
