import { CanActivateFn, Router } from '@angular/router';
import { ConstantData } from '../constants/constant-data';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const loggedUser = localStorage.getItem(ConstantData.LoggedUser);
  const router = inject(Router);
  if (loggedUser) {
    return true;
  }
  router.navigateByUrl('login');
  return false;
};
