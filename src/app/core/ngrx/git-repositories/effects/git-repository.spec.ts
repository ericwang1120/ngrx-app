import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot, getTestScheduler } from 'jasmine-marbles';
import { empty } from 'rxjs/observable/empty';
import { GitRepositoryEffects, LOAD_SCHEDULER, LOAD_DEBOUNCE } from './git-repository';
import { GitRepositoryService } from '../services/git-repository';
import { Observable } from 'rxjs/Observable';
import { Load, LoadSuccess, LoadFail } from '../actions/git-repository';
import { GitRepository, generateMockGitRepository } from '../models/git-repository';

export class TestActions extends Actions {
    constructor() {
        super(empty());
    }

    set stream(source: Observable<any>) {
        this.source = source;
    }
}

export function getActions() {
    return new TestActions();
}

describe('GitRepositoryEffects', () => {
    let effects: GitRepositoryEffects;
    let gitRepositoryService: any;
    let actions$: TestActions;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GitRepositoryEffects,
                {
                    provide: GitRepositoryService,
                    useValue: jasmine.createSpyObj('gitRepositoryService', ['load']),
                },
                { provide: Actions, useFactory: getActions },
                { provide: LOAD_SCHEDULER, useFactory: getTestScheduler },
                { provide: LOAD_DEBOUNCE, useValue: 30 },
            ],
        });

        effects = TestBed.get(GitRepositoryEffects);
        gitRepositoryService = TestBed.get(GitRepositoryService);
        actions$ = TestBed.get(Actions);
    });

    describe('load$', () => {
        it('should load successful', () => {
            const gitRepository1 = generateMockGitRepository();
            const gitRepository2 = { ...gitRepository1, id: '222' };
            const gitRepositories = [gitRepository2, gitRepository2];

            const action = new Load('userName');
            const completion = new LoadSuccess(gitRepositories);

            actions$.stream = hot('-a----', { a: action });
            const response = cold('-a|', { a: gitRepositories });
            const expected = cold('-----b', { b: completion });
            gitRepositoryService.load = () => response;
            expect(effects.load$).toBeObservable(expected);
        });

        it('should load fail', () => {
            const action = new Load('userName');
            const completion = new LoadFail('Unexpected Error. Try again later.');
            const error = 'Unexpected Error. Try again later.';

            actions$.stream = hot('-a----', { a: action });
            const response = cold('-#|', {}, error);
            const expected = cold('-----b', { b: completion });
            gitRepositoryService.load = () => response;

            expect(effects.load$).toBeObservable(expected);
        });
    });
});
