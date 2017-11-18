import { Action } from '@ngrx/store';
import { GitRepository } from '../models/git-repository';
// tslint:disable:max-classes-per-file

export const LOAD = '[Git Repository] Load';
export const LOAD_SUCCESS = '[Git Repository] Load Success';
export const LOAD_FAIL = '[Git Repository] Load Fail';

export class Load implements Action {
    public readonly type = LOAD;

    constructor(public payload: string) { }
}

export class LoadSuccess implements Action {
    public readonly type = LOAD_SUCCESS;

    constructor(public payload: GitRepository[]) { }
}

export class LoadFail implements Action {
    public readonly type = LOAD_FAIL;

    constructor(public payload: any) { }
}

export type Actions = Load
    | LoadSuccess
    | LoadFail;
