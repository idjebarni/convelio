import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './service/user.service';
import { User } from './models/user.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'convelio-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] | undefined;
  destroy$ = new Subject();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
