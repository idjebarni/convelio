import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent } from './user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserService } from './service/user.service';

@NgModule({
  declarations: [UserListComponent, UserDetailsComponent],
  imports: [CommonModule, UserListRoutingModule, HttpClientModule, MatTableModule, MatProgressSpinnerModule],
  providers: [UserService],
})
export class UserListModule {}
