import { TestBed } from '@angular/core/testing';

import { RolesServiceService } from './roles.service';

describe('RolesServiceService', () => {
  let service: RolesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
