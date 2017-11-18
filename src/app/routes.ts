import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: './git-repository-page/git-repository-page.module#GitRepositoryPageModule',
    }
];
