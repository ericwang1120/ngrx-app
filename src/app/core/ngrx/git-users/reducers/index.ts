import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromGitUsers from './git-users';
import * as fromRoot from '../../reducer';

export interface GitUsersState {
    gitUsers: fromGitUsers.State;
}

export interface State extends fromRoot.State {
    'gitUsers': GitUsersState;
}

export const reducers = {
    gitUsers: fromGitUsers.reducer,
};

export const getGitUsersState = createFeatureSelector<GitUsersState>('gitUsers');

export const getGitUserEntitiesState = createSelector(
    getGitUsersState,
    (state) => state.gitUsers
);

export const getGitUsers = createSelector(
    getGitUserEntitiesState,
    fromGitUsers.getGitUsers
);

export const getLoaded = createSelector(
    getGitUserEntitiesState,
    fromGitUsers.getLoaded
);

export const getLoading = createSelector(
    getGitUserEntitiesState,
    fromGitUsers.getLoading
);
