import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserListState } from './user-list.state';
import { User } from '../models/user.model';

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

export const getUserById = (id: number) =>
  createSelector(getUserList, (users) => {
    if (users) {
      return users.find((user: User) => {
        return user.id === id;
      });
    } else {
      return null;
    }
  });
