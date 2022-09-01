import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { of, Subject, takeUntil } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class UserDetailsResolver implements Resolve<any>, OnDestroy {
  destroy$ = new Subject();

  constructor(public userService: UserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {
    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: User[]) => {
        if (
          users?.length > 0 &&
          users.findIndex((users) => users.id === parseInt(route.paramMap.get('userId') as string, 10)) === -1
        ) {
          this.router.navigate(['user-list', 'not-found']);
          return of('Not found');
        }
        return of('User exists');
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
