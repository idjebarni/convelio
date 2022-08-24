import {createAction, props} from '@ngrx/store';
import {User} from "../models/user.model";

export const getUsers = createAction(
    '[User] Get Users'
);

export const getUsersSuccess = createAction(
    '[User] Get Users Success',
    props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
    '[User] Load Users Failure',
    props<{ error: string }>()
);
