import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import { getUsers, getUsersFailure, getUsersSuccess } from './user-list.actions';

export interface UserListState {
  users: User[];
  error: string;
}

export const initialState: User[] = [];

export const userListReducer = createReducer(
  initialState,
  on(getUsers, (state) => state),
  on(getUsersSuccess, (state, { users }) => [...users]),
  on(getUsersFailure, (state, { error }) => ({ ...state, error: error })),
);
