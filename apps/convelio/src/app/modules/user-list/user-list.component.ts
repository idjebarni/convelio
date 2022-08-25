import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { UserService } from './service/user.service';
import { User } from './models/user.model';
import { getUsers, getUsersFailure } from './store/user-list.actions';
import { MatSort } from '@angular/material/sort';
import { UserListState } from './store/user-list.reducer';
import { UserData } from './models/user-data.model';

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
  loading = false;
  isErrored = false;
  error: string;
  users: User[];
  users$: Observable<User[]> = this.store.select('users');
  error$ = this.store.pipe(select(getUsersFailure));

  constructor(private userService: UserService, private router: Router, private store: Store<UserListState>) {}

  ngOnInit(): void {
    this.loadUserList();
    this.handleLoadingError();
  }

  seeUserDetails(user: User) {
    this.router.navigate(['user-list', user.id]);
  }

  applyFilter(event: Event) {
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

  private handleLoadingError() {
    this.error$.subscribe((payload: any) => {
      if (payload.users.error) {
        this.error = payload.users.error;
        this.isErrored = true;
        this.loading = false;
      }
    });
  }

  private loadUserList() {
    this.loading = true;
    this.store.dispatch(getUsers());

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
          this.loading = false;
        },
        error: () => (this.loading = false),
      });
  }
}
