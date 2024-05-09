import { TestBed } from '@angular/core/testing';

import { KosarDbService } from './kosar-db.service';

describe('KosarDbService', () => {
  let service: KosarDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KosarDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
