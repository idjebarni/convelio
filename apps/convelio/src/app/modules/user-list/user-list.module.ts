import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent } from './user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { UserService } from './service/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [UserListComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    UserListRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    SharedModule,
    MatIconModule,
  ],
  providers: [UserService],
})
export class UserListModule {}
