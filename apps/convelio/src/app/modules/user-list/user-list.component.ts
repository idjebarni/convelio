import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from './service/user.service';
import { User } from './models/user.model';
import { getUsers } from './store/user-list.actions';
import { MatSort } from '@angular/material/sort';
import { UserData } from './models/user-data.model';
import { UserListState } from './store/user-list.state';
import { getErrorMessage, getLoading, getUserList } from './store/user-list.selector';

@Component({
  selector: 'convelio-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;

  destroy$ = new Subject();
  displayedColumns: string[] = ['name', 'username', 'city', 'company'];
  dataSource: MatTableDataSource<UserData>;
  users: User[];
  users$: Observable<User[]>;
  error$: Observable<string>;
  loading$: Observable<boolean>;

  constructor(private userService: UserService, private router: Router, private store: Store<UserListState>) {}

  ngOnInit(): void {
    this.store.dispatch(getUsers());

    this.error$ = this.store.select(getErrorMessage);
    this.loading$ = this.store.select(getLoading);
    this.users$ = this.store.select(getUserList);

    this.loadUserList();
  }

  seeUserDetails(user: User) {
    this.router.navigate(['user-list', user.id]);
  }

  searchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  sortData() {
    this.dataSource.sort = this.sort;
  }

  private loadUserList() {
    this.users$
      .pipe(
        takeUntil(this.destroy$),
        filter((users) => !!users && users.length > 0),
      )
      .subscribe({
        next: (users) => {
          const formattedUserArray = users.map((user) => ({
            id: user.id,
            name: user.name,
            username: user.username,
            city: user.address.city,
            company: user.company.name,
          }));

          this.dataSource = new MatTableDataSource<UserData>(formattedUserArray);
          this.dataSource.sort = this.sort;
        },
      });
  }
}
