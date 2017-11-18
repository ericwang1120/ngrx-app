import { reducer } from './git-repositories';
import * as fromGitRepositories from './git-repositories';
import { Load, LoadFail, LoadSuccess } from '../actions/git-repository';
import { GitRepository, generateMockGitRepository } from '../models/git-repository';

describe('GitRepositoriesReducer', () => {
    const gitRepository1 = generateMockGitRepository();
    const gitRepository2 = { ...gitRepository1, id: '222' };
    const gitRepository3 = { ...gitRepository1, id: '333' };
    const initialState: fromGitRepositories.State = {
        loaded: false,
        loading: false,
        gitRepositories: [],
    };

    describe('undefined action', () => {
        it('should return the default state', () => {
            const result = reducer(undefined, {} as any);

            expect(result).toEqual(initialState);
        });
    });

    describe('LOAD', () => {
        const expectedResult = {
            loaded: false,
            loading: true,
            gitRepositories: [],
        };

        it('should change loading to true', () => {
            const action = new Load('userName');

            const result = reducer(initialState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('LOAD_SUCCESS', () => {
        const expectedResult = {
            loaded: true,
            loading: false,
            gitRepositories: [gitRepository2, gitRepository3],
        };

        it('should load gitRepositories', () => {
            const action = new LoadSuccess([gitRepository2, gitRepository3]);

            const result = reducer(initialState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('LOAD_FAIL', () => {
        const expectedResult = {
            loaded: true,
            loading: false,
            gitRepositories: [],
        };

        it('return empty array of gitRepositories when load fail', () => {
            const action = new LoadFail('Error Message');

            const result = reducer(initialState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('selectors', () => {
        const expectedResult = {
            loaded: true,
            loading: false,
            gitRepositories: [],
        };

        it('should return correct selector', () => {
            const loaded = expectedResult.loaded;
            const loading = expectedResult.loading;
            const gitRepositories = expectedResult.gitRepositories;

            expect(fromGitRepositories.getLoaded(expectedResult)).toEqual(loaded);
            expect(fromGitRepositories.getLoading(expectedResult)).toEqual(loading);
            expect(fromGitRepositories.getGitRepositories(expectedResult)).toEqual(gitRepositories);
        });
    });
});
