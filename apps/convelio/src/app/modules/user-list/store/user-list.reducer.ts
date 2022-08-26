import { createReducer, on } from '@ngrx/store';
import { getUsers, getUsersSuccess, setErrorMessage, setLoading } from './user-list.actions';
import { initialState } from './user-list.state';

export const userListReducer = createReducer(
  initialState,
  on(getUsers, (state) => ({
    ...state,
  })),
  on(getUsersSuccess, (state, { users }) => ({
    ...state,
    users: users,
  })),
  on(setLoading, (state, action) => ({ ...state, loading: action.loading })),
  on(setErrorMessage, (state, action) => ({ ...state, errorMessage: action.message })),
);
