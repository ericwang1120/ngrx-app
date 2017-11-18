import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromGitRepositories from './git-repositories';
import * as fromRoot from '../../reducer';

export interface GitRepositoriesState {
    gitRepositories: fromGitRepositories.State;
}

export interface State extends fromRoot.State {
    'gitRepositories': GitRepositoriesState;
}

export const reducers = {
    gitRepositories: fromGitRepositories.reducer,
};

export const getGitRepositoriesState = createFeatureSelector<GitRepositoriesState>('gitRepositories');

export const getGitRepositoryEntitiesState = createSelector(
    getGitRepositoriesState,
    (state) => state.gitRepositories
);

export const getGitRepositories = createSelector(
    getGitRepositoryEntitiesState,
    fromGitRepositories.getGitRepositories
);

export const getLoaded = createSelector(
    getGitRepositoryEntitiesState,
    fromGitRepositories.getLoaded
);

export const getLoading = createSelector(
    getGitRepositoryEntitiesState,
    fromGitRepositories.getLoading
);
