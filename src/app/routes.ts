import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'git-user-page',
        loadChildren: './git-user-page/git-user-page.module#GitUserPageModule',
    }
];
