import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { GitUserPageComponent } from './git-user-page.component';

// lazy loading
import { RouterModule } from '@angular/router';
import { routes } from './git-user-page.routes';

// ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from '../core/ngrx/git-users/reducers';
import { GitUserEffects } from '../core/ngrx/git-users/effects/git-user';
import { GitUserService } from '../core/ngrx/git-users/services/git-user';

@NgModule({
  declarations: [
    GitUserPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('gitUsers', reducers),
    EffectsModule.forFeature([GitUserEffects]),
  ],
  providers: [
    GitUserService,
  ]
})
export class GitUserPageModule {
}
