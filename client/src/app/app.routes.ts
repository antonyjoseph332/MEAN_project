import { Routes } from '@angular/router';
import { UsersComponent } from './modules/users/users.component';
import { UserListComponent } from './modules/users/user-list/user-list.component';
import { ArticlesComponent } from './modules/articles/articles.component';
import { CompaniesComponent } from './modules/companies/companies.component';
import { CompaniesListComponent } from './modules/companies/companies-list/companies-list.component';
import { CompaniesFormComponent } from './modules/companies/companies-form/companies-form.component';
import { UserFormComponent } from './modules/users/user-form/user-form.component';
import { HomeComponent } from './modules/home/home.component';

export const routes: Routes = [

    {
        path: '',
        component: HomeComponent,
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
                    [{
                        path: 'list',
                        component: CompaniesListComponent
                    },
                    ]
            }
        ]
    },
];
