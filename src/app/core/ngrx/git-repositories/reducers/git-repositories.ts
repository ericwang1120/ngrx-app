import { createSelector } from '@ngrx/store';
import { GitRepository, generateMockGitRepository } from '../models/git-repository';
import * as gitRepository from '../actions/git-repository';

export interface State {
    loaded: boolean;
    loading: boolean;
    gitRepositories: GitRepository[];
}

export const initialState: State = {
    loaded: false,
    loading: false,
    gitRepositories: [],
};

export function reducer(
    state = initialState,
    action: gitRepository.Actions
): State {
    switch (action.type) {
        case gitRepository.LOAD: {
            return {
                ...state,
                loading: true,
            };
        }

        case gitRepository.LOAD_SUCCESS: {
            return {
                loaded: true,
                loading: false,
                gitRepositories: action.payload,
            };
        }

        case gitRepository.LOAD_FAIL: {
            return {
                loaded: true,
                loading: false,
                gitRepositories: [],
            };
        }

        default: {
            return state;
        }
    }
}

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getGitRepositories = (state: State) => state.gitRepositories;
