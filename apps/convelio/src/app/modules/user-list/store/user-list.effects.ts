import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { UserService } from '../service/user.service';
import { getUsers, getUsersFailure, getUsersSuccess } from './user-list.actions';

@Injectable()
export class UserListEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUsers),
      mergeMap(() =>
        this.userService.getUsers().pipe(
          map((users) => getUsersSuccess({ users })),
          catchError(() => of(getUsersFailure({ error: 'Looks like something went wrong! Try refreshing.' }))),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
