import { TestBed } from '@angular/core/testing';

import { AnyagDbService } from './anyag-db.service';

describe('AnyagDbService', () => {
  let service: AnyagDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnyagDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
