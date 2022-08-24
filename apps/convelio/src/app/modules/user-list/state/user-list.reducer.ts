import {createReducer, on} from '@ngrx/store';
import {User} from "../models/user.model";
import {getUsers, getUsersSuccess, loadUsersFailure} from "./user-list.actions"

export interface State {
    users: User[];
}

export const initialState: State = {
    users: [],
};

export const userListReducer = createReducer(
    initialState,
    on(getUsers, state => ({...state})),
    on(getUsersSuccess, (state, {users}) => ({users})),
    on(loadUsersFailure, state => ({...state, error: 'loadUsersFailure'})),
);
