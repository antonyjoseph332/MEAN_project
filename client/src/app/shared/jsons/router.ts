import { AuthService } from "../../core/auth.service";
import { inject } from "@angular/core";

const routers = [
    { route: '/companies', hasMenu: true, header: 'Companies', icon: 'appstore', access: ['admin'] },
    { route: '/companies/list', header: 'Companies', icon: 'appstore', access: ['admin'] },
    { route: '/article', hasMenu: true, header: 'Articles', icon: 'audit', access: ['admin', 'user'] },
    { route: '/article/list', header: 'Articles', icon: 'audit', access: ['admin', 'user'] },
    { route: '/user', hasMenu: true, header: 'Users', icon: 'user', access: ['admin', 'user'] },
    { route: '/user/list', header: 'Users', icon: 'user', access: ['admin', 'user'] },
]

export const accessUsers = function getAccessUser(type?: string) {
    const authService = inject(AuthService);
    const loginUser: any = authService.getUser();
    let userRouters: any[] = routers.map(route => ({ ...route, hasAccess: route.access.includes(loginUser.userType) }));
    if (type === 'sidemenu') {
        userRouters = userRouters.filter(route => route.hasMenu && route.hasAccess);
    }
    return userRouters;
}