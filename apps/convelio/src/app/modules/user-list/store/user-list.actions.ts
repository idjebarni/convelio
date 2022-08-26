import { createAction, props } from '@ngrx/store';
import { User } from '../models/user.model';

export const getUsers = createAction('[User] Get Users');

export const getUsersSuccess = createAction('[User] Get Users Success', props<{ users: User[] }>());

export const setLoading = createAction('[User] Set loading', props<{ loading: boolean }>());

export const setErrorMessage = createAction('[User] Set error message', props<{ message: string }>());
