import { TestBed } from '@angular/core/testing';

import { VelemenyDbService } from './velemeny-db.service';

describe('VelemenyDbService', () => {
  let service: VelemenyDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VelemenyDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
