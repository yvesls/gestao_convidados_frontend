import { TestBed } from '@angular/core/testing';

import { ConvidadosStore } from './convidados.store';

describe('ConvidadosService', () => {
  let service: ConvidadosStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConvidadosStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
