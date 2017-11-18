import { reducer } from './git-users';
import * as fromGitUsers from './git-users';
import { Load, LoadFail, LoadSuccess } from '../actions/git-user';
import { GitUser, generateMockGitUser } from '../models/git-user';

describe('GitUsersReducer', () => {
    const gitUser1 = generateMockGitUser();
    const gitUser2 = { ...gitUser1, id: '222' };
    const gitUser3 = { ...gitUser1, id: '333' };
    const initialState: fromGitUsers.State = {
        loaded: false,
        loading: false,
        gitUsers: [],
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
            gitUsers: [],
        };

        it('should change loading to true', () => {
            const action = new Load();

            const result = reducer(initialState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('LOAD_SUCCESS', () => {
        const expectedResult = {
            loaded: true,
            loading: false,
            gitUsers: [gitUser2, gitUser3],
        };

        it('should load gitUsers', () => {
            const action = new LoadSuccess([gitUser2, gitUser3]);

            const result = reducer(initialState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('LOAD_FAIL', () => {
        const expectedResult = {
            loaded: true,
            loading: false,
            gitUsers: [],
        };

        it('return empty array of gitUsers when load fail', () => {
            const action = new LoadFail('Error Message');

            const result = reducer(initialState, action);

            expect(result).toEqual(expectedResult);
        });
    });

    describe('selectors', () => {
        const expectedResult = {
            loaded: true,
            loading: false,
            gitUsers: [],
        };

        it('should return correct selector', () => {
            const loaded = expectedResult.loaded;
            const loading = expectedResult.loading;
            const gitUsers = expectedResult.gitUsers;

            expect(fromGitUsers.getLoaded(expectedResult)).toEqual(loaded);
            expect(fromGitUsers.getLoading(expectedResult)).toEqual(loading);
            expect(fromGitUsers.getGitUsers(expectedResult)).toEqual(gitUsers);
        });
    });
});
