import { TestBed } from '@angular/core/testing';

import { UsersServiceService } from './users.service';

describe('UsersServiceService', () => {
  let service: UsersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
