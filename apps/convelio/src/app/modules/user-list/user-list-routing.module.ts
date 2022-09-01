import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { UserDetailsResolver } from './resolvers/user-details.resolver';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: ':userId',
    component: UserDetailsComponent,
    resolve: {
      data: UserDetailsResolver,
    },
    data: { path: ':userId' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserDetailsResolver],
})
export class UserListRoutingModule {}
