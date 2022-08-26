import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserListState } from './user-list.state';

const getUserListState = createFeatureSelector<UserListState>('users');

export const getLoading = createSelector(getUserListState, (state) => {
  return state.loading;
});

export const getErrorMessage = createSelector(getUserListState, (state) => {
  return state.errorMessage;
});

export const getUserList = createSelector(getUserListState, (state) => {
  return state.users;
});
