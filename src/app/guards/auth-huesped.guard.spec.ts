import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authHuespedGuard } from './auth-huesped.guard';

describe('authHuespedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authHuespedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
