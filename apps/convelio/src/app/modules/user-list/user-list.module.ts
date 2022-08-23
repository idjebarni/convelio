import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserListRoutingModule} from './user-list-routing.module';
import {UserListComponent} from './user-list.component';
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './service/user.service';
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [UserListComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    UserListRoutingModule,
    MatCardModule,
    HttpClientModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
  providers: [UserService],
})
export class UserListModule {
}
