import { CanActivateFn } from '@angular/router';
import { accessUsers } from '../shared/jsons/router';

export const userRoleGuard: CanActivateFn = (route, state) => {
  const router = accessUsers().find(route => route.route === state.url)
  return router.hasAccess;
};
