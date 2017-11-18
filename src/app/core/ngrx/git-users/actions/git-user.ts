import { Action } from '@ngrx/store';
import { GitUser } from '../models/git-user';
// tslint:disable:max-classes-per-file

export const LOAD = '[Git User] Load';
export const LOAD_SUCCESS = '[Git User] Load Success';
export const LOAD_FAIL = '[Git User] Load Fail';

export class Load implements Action {
    public readonly type = LOAD;
}

export class LoadSuccess implements Action {
    public readonly type = LOAD_SUCCESS;

    constructor(public payload: GitUser[]) { }
}

export class LoadFail implements Action {
    public readonly type = LOAD_FAIL;

    constructor(public payload: any) { }
}

export type Actions = Load
    | LoadSuccess
    | LoadFail;
