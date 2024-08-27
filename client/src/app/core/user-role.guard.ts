import { CanActivateFn } from '@angular/router';
import { accessUsers } from '../shared/jsons/router';

export const userRoleGuard: CanActivateFn = (route, state) => {
  let url = state.url
  if (route.params && route.params['id']) {
    const stateUrls = state.url.split('/').filter(path => path !== route.params['id']);
    console.log(stateUrls);
    url = stateUrls.join('/');
  }
  const router = accessUsers().find(route => route.route === url)
  return router.hasAccess;
};
