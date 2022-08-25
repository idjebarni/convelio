import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from './service/user.service';
import { User } from './models/user.model';
import { getUsers } from './state/user-list.actions';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'convelio-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;

  destroy$ = new Subject();
  displayedColumns: string[] = ['name', 'username', 'city', 'company'];
  dataSource: MatTableDataSource<User>;
  isLoading = false;
  users: User[];
  users$: Observable<User[]> = this.store.select((state) => state.users.users);

  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store<{ users: { users: User[] } }>,
  ) {}

  ngOnInit(): void {
    this.loadUserList();
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

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  sortData(sort: Sort) {
    this.dataSource.sort = this.sort;
  }

  private loadUserList() {
    this.isLoading = true;
    this.store.dispatch(getUsers());

    this.users$.subscribe({
      next: (users) => {
        if (users.length > 0) {
          this.users = users;
          this.dataSource = new MatTableDataSource<User>(users);
          this.dataSource.sort = this.sort;
          this.isLoading = false;
        }
      },
      error: () => (this.isLoading = false),
    });
  }
}
