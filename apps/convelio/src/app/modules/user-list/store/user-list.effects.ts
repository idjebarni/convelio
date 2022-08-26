import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserService } from '../service/user.service';
import { getUsers, getUsersSuccess, setErrorMessage, setLoading } from './user-list.actions';
import { Store } from '@ngrx/store';

const genericError = 'Looks like something went wrong! Try refreshing.';

@Injectable()
export class UserListEffects {
  loadUsers$ = createEffect(() => {
    this.store.dispatch(setLoading({ loading: true }));
    return this.actions$.pipe(
      ofType(getUsers),
      mergeMap(() => {
        return this.userService.getUsers().pipe(
          map((users) => {
            this.store.dispatch(setLoading({ loading: false }));
            return getUsersSuccess({ users });
          }),
          catchError(() => {
            this.store.dispatch(setLoading({ loading: false }));
            return of(setErrorMessage({ message: genericError }));
          }),
        );
      }),
    );
  });

  constructor(private actions$: Actions, private userService: UserService, private store: Store) {}
}
