import { TestBed } from '@angular/core/testing';

import { LoginStore } from './login.store';

describe('LoginStore', () => {
  let service: LoginStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
