import { User } from '../models/user.model';

export interface UserListState {
  users: User[];
  loading: boolean;
  errorMessage: string;
}

export const initialState: UserListState = {
  users: [],
  loading: false,
  errorMessage: '',
};
