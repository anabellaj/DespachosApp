import { TestBed } from '@angular/core/testing';

import { Despachos } from './despachos';

describe('Despachos', () => {
  let service: Despachos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Despachos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
