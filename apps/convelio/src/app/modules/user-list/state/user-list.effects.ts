import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserService } from '../service/user.service';
import { getUsers, getUsersSuccess, loadUsersFailure } from './user-list.actions';

@Injectable()
export class UserListEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users) => getUsersSuccess({ payload: users })),
          catchError(() => of(loadUsersFailure({ error: 'loadUsersFailure' }))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
