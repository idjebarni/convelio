import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "./models/user.model";
import {UserService} from "./service/user.service";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'convelio-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[];
  destroy$ = new Subject();
  displayedColumns: string[] = ['name', 'username', 'city', 'company'];
  dataSource: MatTableDataSource<User>;
  isLoading = false;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.initUserList();
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  seeUserDetails(user: User) {
    this.router.navigate(['user-list', user.id]);
  }

  private initUserList() {
    this.isLoading = true;
    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (users: User[]) => {
          this.users = users;
          this.dataSource = new MatTableDataSource(this.users)
          this.isLoading = false;
        },
        error: () =>
          this.isLoading = false
      });
  }
}
