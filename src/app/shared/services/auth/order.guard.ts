import { CanActivateFn, Router } from '@angular/router';

export const orderGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('kosar')) {
    return true;
  }else {
    new Router().navigate(['/']);
    return false;}
};
