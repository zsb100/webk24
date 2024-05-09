import { TestBed } from '@angular/core/testing';

import { RendelesDbService } from './rendeles-db.service';

describe('RendelesDbService', () => {
  let service: RendelesDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RendelesDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
