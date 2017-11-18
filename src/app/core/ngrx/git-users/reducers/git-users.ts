import { createSelector } from '@ngrx/store';
import { GitUser, generateMockGitUser } from '../models/git-user';
import * as gitUser from '../actions/git-user';

export interface State {
    loaded: boolean;
    loading: boolean;
    gitUsers: GitUser[];
}

export const initialState: State = {
    loaded: false,
    loading: false,
    gitUsers: [],
};

export function reducer(
    state = initialState,
    action: gitUser.Actions
): State {
    switch (action.type) {
        case gitUser.LOAD: {
            return {
                ...state,
                loading: true,
            };
        }

        case gitUser.LOAD_SUCCESS: {
            return {
                loaded: true,
                loading: false,
                gitUsers: action.payload,
            };
        }

        case gitUser.LOAD_FAIL: {
            return {
                loaded: true,
                loading: false,
                gitUsers: [],
            };
        }

        default: {
            return state;
        }
    }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getGitUsers = (state: State) => state.gitUsers;
