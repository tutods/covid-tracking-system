import { TestBed } from '@angular/core/testing';

import { CovidTestService } from './covid-test.service';

describe('CovidTestService', () => {
  let service: CovidTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CovidTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
