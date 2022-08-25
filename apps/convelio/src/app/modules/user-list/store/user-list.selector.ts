import { createSelector } from '@ngrx/store';
import { UserListState } from './user-list.reducer';
import { User } from '../models/user.model';

export const selectItems = (state: UserListState) => state.users;

export const getUserById = (id: number) =>
  createSelector(selectItems, (users: User[]) => {
    if (users) {
      return users.find((user: User) => {
        return user.id === id;
      });
    } else {
      return {};
    }
  });
