import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import { Injectable, InjectionToken, Optional, Inject } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { of } from 'rxjs/observable/of';
import { GitUserService } from '../services/git-user';

import * as gitUser from '../actions/git-user';

export const LOAD_DEBOUNCE = new InjectionToken<number>('Load Debounce');
export const LOAD_SCHEDULER = new InjectionToken<Scheduler>(
    'Load Scheduler'
);

@Injectable()
export class GitUserEffects {
    @Effect()
    public load$: Observable<Action> = this.actions$
        .ofType<gitUser.Load>(gitUser.LOAD)
        .debounceTime(this.debounce || 300, this.scheduler || async)
        .switchMap(() => {
            return this.gitUserService
                .load()
                .map((result) => new gitUser.LoadSuccess(result))
                .catch((err) => of(new gitUser.LoadFail(err)));
        });

    constructor(
        private actions$: Actions,
        private gitUserService: GitUserService,
        @Optional()
        @Inject(LOAD_DEBOUNCE)
        private debounce,
        @Optional()
        @Inject(LOAD_SCHEDULER)
        private scheduler: Scheduler
    ) {
    }
}
