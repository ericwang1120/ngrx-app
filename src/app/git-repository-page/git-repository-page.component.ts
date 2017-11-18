import {
  Component,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

// ngrx
import { Store } from '@ngrx/store';
import * as fromGitRepositories from '../core/ngrx/git-repositories/reducers';
import * as gitRepository from '../core/ngrx/git-repositories/actions/git-repository';
import { GitRepository } from '../core/ngrx/git-repositories/models/git-repository';

@Component({
  selector: 'app-git-repository-page',
  styleUrls: ['./git-repository-page.component.scss'],
  templateUrl: './git-repository-page.component.html'
})
export class GitRepositoryPageComponent implements OnInit {
  public gitRepositories$: Observable<GitRepository[]>;
  public loading$: Observable<boolean>;
  public userName = 'ngrx';

  constructor(
    private store: Store<fromGitRepositories.State>
  ) {
    this.gitRepositories$ = store.select(fromGitRepositories.getGitRepositories);
    this.loading$ = store.select(fromGitRepositories.getLoading);
  }

  public ngOnInit(): void {
    this.submit(this.userName);
  }

  public submit(userName): void {
    this.userName = userName;
    this.store.dispatch(new gitRepository.Load(userName));
  }
}
