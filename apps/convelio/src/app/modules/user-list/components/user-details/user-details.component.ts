import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UserListState } from '../../store/user-list.reducer';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { getUserById } from '../../store/user-list.selector';
import { getUsers } from '../../store/user-list.actions';

@Component({
  selector: 'convelio-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  selectedUser$: Observable<any>;
  destroy$ = new Subject();
  private actualUserId: number;

  constructor(private store: Store<UserListState>, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.store.dispatch(getUsers());
    this.handleUrlParams();
    this.updateCurrentUser();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  handleUrlParams() {
    this.activatedRoute.params.pipe(takeUntil(this.destroy$)).subscribe((params: Params) => {
      if (!isNaN(parseInt(params['userId']))) {
        this.actualUserId = parseInt(params['userId']);
      }
    });
  }

  private updateCurrentUser() {
    this.selectedUser$ = this.store.pipe(select(getUserById(this.actualUserId)));
  }
}
