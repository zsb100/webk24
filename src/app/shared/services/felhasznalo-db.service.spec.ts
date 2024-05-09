import { TestBed } from '@angular/core/testing';

import { FelhasznaloDbService } from './felhasznalo-db.service';

describe('FelhasznaloDbService', () => {
  let service: FelhasznaloDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FelhasznaloDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
