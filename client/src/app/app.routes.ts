import { Routes } from '@angular/router';
import { UsersComponent } from './modules/users/users.component';
import { UserListComponent } from './modules/users/user-list/user-list.component';
import { ArticlesComponent } from './modules/articles/articles.component';
import { ArticleFormComponent } from './modules/articles/article-form/article-form.component';
import { CompaniesComponent } from './modules/companies/companies.component';
import { CompaniesListComponent } from './modules/companies/companies-list/companies-list.component';
import { CompaniesFormComponent } from './modules/companies/companies-form/companies-form.component';
import { UserFormComponent } from './modules/users/user-form/user-form.component';
import { ArticleListComponent } from './modules/articles/article-list/article-list.component';

export const routes: Routes = [
    {
        path: 'user',
        component: UsersComponent,
        children: [
            {
                path: 'list',
                component: UserListComponent
            },
            {
                path: 'form',
                component: UserFormComponent
            }
        ]
    },
    {
        path: '',
        component: ArticlesComponent,
        children: [
            {
                path: '',
                component: ArticleFormComponent
            },
            {
                path: 'list',
                component: ArticleListComponent
            }
        ]
    },
    {
        path: 'companies',
        component: CompaniesComponent,
        children:
            [{
                path: 'list',
                component: CompaniesListComponent
            },
            {
                path: 'form',
                component: CompaniesFormComponent
            }]
    }
];
