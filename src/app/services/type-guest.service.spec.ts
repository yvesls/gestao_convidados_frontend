import { TestBed } from '@angular/core/testing';

import { TypeGuestService } from './type-guest.service';

describe('TipóConvidadosService', () => {
  let service: TypeGuestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeGuestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
