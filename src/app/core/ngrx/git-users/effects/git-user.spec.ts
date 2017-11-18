import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { cold, hot, getTestScheduler } from 'jasmine-marbles';
import { empty } from 'rxjs/observable/empty';
import { GitUserEffects, LOAD_SCHEDULER, LOAD_DEBOUNCE } from './git-user';
import { GitUserService } from '../services/git-user';
import { Observable } from 'rxjs/Observable';
import { Load, LoadSuccess, LoadFail } from '../actions/git-user';
import { GitUser, generateMockGitUser } from '../models/git-user';

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

describe('GitUserEffects', () => {
    let effects: GitUserEffects;
    let gitUserService: any;
    let actions$: TestActions;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GitUserEffects,
                {
                    provide: GitUserService,
                    useValue: jasmine.createSpyObj('gitUserService', ['load']),
                },
                { provide: Actions, useFactory: getActions },
                { provide: LOAD_SCHEDULER, useFactory: getTestScheduler },
                { provide: LOAD_DEBOUNCE, useValue: 30 },
            ],
        });

        effects = TestBed.get(GitUserEffects);
        gitUserService = TestBed.get(GitUserService);
        actions$ = TestBed.get(Actions);
    });

    describe('load$', () => {
        it('should load successful', () => {
            const gitUser1 = generateMockGitUser();
            const gitUser2 = { ...gitUser1, id: '222' };
            const gitUsers = [gitUser2, gitUser2];

            const action = new Load();
            const completion = new LoadSuccess(gitUsers);

            actions$.stream = hot('-a----', { a: action });
            const response = cold('-a|', { a: gitUsers });
            const expected = cold('-----b', { b: completion });
            gitUserService.load = () => response;
            expect(effects.load$).toBeObservable(expected);
        });

        it('should load fail', () => {
            const action = new Load();
            const completion = new LoadFail('Unexpected Error. Try again later.');
            const error = 'Unexpected Error. Try again later.';

            actions$.stream = hot('-a----', { a: action });
            const response = cold('-#|', {}, error);
            const expected = cold('-----b', { b: completion });
            gitUserService.load = () => response;

            expect(effects.load$).toBeObservable(expected);
        });
    });
});
