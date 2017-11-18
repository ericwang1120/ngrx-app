import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { GitRepositoryPageComponent } from './git-repository-page.component';

// lazy loading
import { RouterModule } from '@angular/router';
import { routes } from './git-repository-page.routes';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from '../core/ngrx/git-repositories/reducers';
import { GitRepositoryEffects } from '../core/ngrx/git-repositories/effects/git-repository';
import { GitRepositoryService } from '../core/ngrx/git-repositories/services/git-repository';

import { RepositorySearchComponent } from './repository-search/repository-search.component';
import { RepositoryDisplayComponent } from './repository-display/repository-display.component';

@NgModule({
  declarations: [
    GitRepositoryPageComponent,
    RepositorySearchComponent,
    RepositoryDisplayComponent
],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('gitRepositories', reducers),
    EffectsModule.forFeature([GitRepositoryEffects]),
  ],
  providers: [
    GitRepositoryService,
  ]
})
export class GitRepositoryPageModule {
}
