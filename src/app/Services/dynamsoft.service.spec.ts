import { TestBed } from '@angular/core/testing';

import { DynamsoftService } from './dynamsoft.service';

describe('DynamsoftService', () => {
  let service: DynamsoftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamsoftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
