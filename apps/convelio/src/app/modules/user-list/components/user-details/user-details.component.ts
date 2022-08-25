import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserListState } from '../../store/user-list.reducer';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { getUsers } from '../../store/user-list.actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'convelio-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  currentUser: User | undefined;
  destroy$ = new Subject();
  users$: Observable<User[]> = this.store.select('users');

  constructor(private store: Store<UserListState>, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(getUsers());
    this.handleUrlParams();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private redirectTo404() {
    this.router.navigate(['user-list', 'not-found']);
  }

  private handleUrlParams() {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((params: Params) => {
      if (!isNaN(parseInt(params['userId']))) {
        const actualUserId = parseInt(params['userId']);
        this.setCurrentUser(actualUserId);
      } else {
        this.redirectTo404();
      }
    });
  }

  private setCurrentUser(actualUserId: number) {
    this.users$
      .pipe(
        takeUntil(this.destroy$),
        filter((users) => !!users && users.length > 0),
      )
      .subscribe((users) => {
        this.currentUser = users.find((user) => user.id === actualUserId);

        if (!this.currentUser) {
          this.redirectTo404();
        }
      });
  }
}
