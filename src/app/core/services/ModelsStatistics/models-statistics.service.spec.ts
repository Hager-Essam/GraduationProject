import { TestBed } from '@angular/core/testing';

import { ModelsStatisticsService } from './models-statistics.service';

describe('ModelsStatisticsService', () => {
  let service: ModelsStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelsStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
