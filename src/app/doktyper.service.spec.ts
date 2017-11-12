import { TestBed, inject } from '@angular/core/testing';

import { DoktyperService } from './doktyper.service';

describe('DoktyperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoktyperService]
    });
  });

  it('should be created', inject([DoktyperService], (service: DoktyperService) => {
    expect(service).toBeTruthy();
  }));
});
