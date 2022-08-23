import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent } from './user-list.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './service/user.service';

@NgModule({
  declarations: [UserListComponent, UserItemComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    UserListRoutingModule,
    MatCardModule,
    HttpClientModule,
  ],
  providers: [UserService],
})
export class UserListModule {}
