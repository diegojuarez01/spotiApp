import { TestBed } from '@angular/core/testing';

import { SpotiappService } from './spotiapp.service';

describe('SpotiappService', () => {
  let service: SpotiappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotiappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
