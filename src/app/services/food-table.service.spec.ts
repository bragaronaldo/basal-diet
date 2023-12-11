import { TestBed } from '@angular/core/testing';

import { FoodTableService } from './food-table.service';

describe('FoodTableService', () => {
  let service: FoodTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
