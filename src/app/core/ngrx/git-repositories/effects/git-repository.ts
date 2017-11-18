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
import { GitRepositoryService } from '../services/git-repository';

import * as gitRepository from '../actions/git-repository';

export const LOAD_DEBOUNCE = new InjectionToken<number>('Load Debounce');
export const LOAD_SCHEDULER = new InjectionToken<Scheduler>(
    'Load Scheduler'
);

@Injectable()
export class GitRepositoryEffects {
    @Effect()
    public load$: Observable<Action> = this.actions$
        .ofType<gitRepository.Load>(gitRepository.LOAD)
        .debounceTime(this.debounce || 1000, this.scheduler || async)
        .map((action) => action.payload)
        .switchMap((payload) => {
            return this.gitRepositoryService
                .load(payload)
                .map((result) => new gitRepository.LoadSuccess(result))
                .catch((err) => of(new gitRepository.LoadFail(err)));
        });

    constructor(
        private actions$: Actions,
        private gitRepositoryService: GitRepositoryService,
        @Optional()
        @Inject(LOAD_DEBOUNCE)
        private debounce,
        @Optional()
        @Inject(LOAD_SCHEDULER)
        private scheduler: Scheduler
    ) {
    }
}
