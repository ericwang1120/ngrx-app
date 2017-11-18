import {
  Component,
  OnInit
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

// ngrx
import { Store } from '@ngrx/store';
import * as fromGitUsers from '../core/ngrx/git-users/reducers';
import * as gitUser from '../core/ngrx/git-users/actions/git-user';
import { GitUser } from '../core/ngrx/git-users/models/git-user';

@Component({
  selector: 'app-git-user-page',
  styleUrls: ['./git-user-page.component.scss'],
  templateUrl: './git-user-page.component.html'
})
export class GitUserPageComponent implements OnInit {
  public gitUsers$: Observable<GitUser[]>;

  constructor(
    private store: Store<fromGitUsers.State>
  ) {
    this.gitUsers$ = store.select(fromGitUsers.getGitUsers);
  }

  public ngOnInit(): void {
    this.store.dispatch(new gitUser.Load());
  }
}
