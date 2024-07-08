import { TestBed } from '@angular/core/testing';
import { LoggedGuard } from './logged.guard';


describe('LoggedService', () => {
  let service: LoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
