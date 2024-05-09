import { TestBed } from '@angular/core/testing';

import { CimDbService } from './cim-db.service';

describe('CimDbService', () => {
  let service: CimDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CimDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
