import { TestBed } from '@angular/core/testing';

import { TermekDbService } from './termek-db.service';

describe('TermekDbService', () => {
  let service: TermekDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TermekDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
