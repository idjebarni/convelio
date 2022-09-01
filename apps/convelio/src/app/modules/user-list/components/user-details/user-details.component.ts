import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { getUsers } from '../../store/user-list.actions';
import { User } from '../../models/user.model';
import { UserListState } from '../../store/user-list.state';
import { getUserById, getUserList } from '../../store/user-list.selector';

@Component({
  selector: 'convelio-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  currentUser: User | null | undefined;
  destroy$ = new Subject();
  users$: Observable<User[]>;

  constructor(private store: Store<UserListState>, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.initStore();
    this.handleUrlParams();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private initStore(): void {
    this.store.dispatch(getUsers());
    this.users$ = this.store.select(getUserList);
  }

  private handleUrlParams(): void {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((params: Params) => {
      if (!isNaN(parseInt(params['userId']))) {
        this.setCurrentUser(parseInt(params['userId']));
      }
    });
  }

  private setCurrentUser(actualUserId: number): void {
    this.store
      .select(getUserById(actualUserId))
      .pipe(
        takeUntil(this.destroy$),
        filter((user) => !!user),
      )
      .subscribe((item) => {
        this.currentUser = item;
      });
  }
}
