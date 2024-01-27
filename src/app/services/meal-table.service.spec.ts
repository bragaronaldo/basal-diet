import { TestBed } from '@angular/core/testing';

import { MealTableService } from './meal-table.service';

describe('MealTableService', () => {
  let service: MealTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
