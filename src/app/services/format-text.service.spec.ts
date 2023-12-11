import { TestBed } from '@angular/core/testing';

import { FormatTextService } from './format-text.service';

describe('FormatTextService', () => {
  let service: FormatTextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatTextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
