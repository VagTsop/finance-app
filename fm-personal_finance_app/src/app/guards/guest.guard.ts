import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);

  if (!auth.isLoggedIn()) {
    return true;
  }

  return inject(Router).createUrlTree(['/overview']);
};
