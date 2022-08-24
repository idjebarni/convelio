import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "./models/user.model";
import {UserService} from "./service/user.service";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {getUsers} from "./state/user-list.actions";

@Component({
  selector: 'convelio-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  displayedColumns: string[] = ['name', 'username', 'city', 'company'];
  dataSource: MatTableDataSource<User>;
  isLoading = false;
  users$: Observable<any> = this.store.select(state => state.users);


  constructor(private userService: UserService, private router: Router, private store: Store<{ users: User[] }>) {
  }

  ngOnInit(): void {
    this.initUserList();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  seeUserDetails(user: User) {
    this.router.navigate(['user-list', user.id]);
  }

  private initUserList() {
    this.isLoading = true;
    this.store.dispatch(getUsers());

    this.users$.subscribe(({
      next: (payload) => {
        if (payload.users.length > 0) {
          this.dataSource = new MatTableDataSource(payload.users)
          this.isLoading = false;
        }
      },
      error: () =>
        this.isLoading = false
    }));
  }
}
