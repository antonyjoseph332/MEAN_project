import { Routes } from '@angular/router';
import { UsersComponent } from './modules/users/users.component';
import { UserListComponent } from './modules/users/user-list/user-list.component';
import { ArticlesComponent } from './modules/articles/articles.component';
import { CompaniesComponent } from './modules/companies/companies.component';
import { CompaniesListComponent } from './modules/companies/companies-list/companies-list.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { tokenGuardGuard } from './core/token-guard.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [tokenGuardGuard]
    },
    {
        path: '',
        component: HomeComponent,
        canActivate: [tokenGuardGuard],
        children: [
            {
                path: '',
                redirectTo: 'user',
                pathMatch: 'full'
            },
            {
                path: 'user',
                component: UsersComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'list',
                        pathMatch: 'full'
                    },
                    {
                        path: 'list',
                        component: UserListComponent
                    },
                ]
            },
            {
                path: 'article',
                component: ArticlesComponent,
            },
            {
                path: 'companies',
                component: CompaniesComponent,
                children:
                    [
                        {
                            path: '',
                            redirectTo: 'list',
                            pathMatch: 'full'
                        },
                        {
                            path: 'list',
                            component: CompaniesListComponent
                        },
                    ]
            }
        ]
    },
];
