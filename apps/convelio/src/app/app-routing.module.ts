import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'user-list',
    loadChildren: () =>
      import('./modules/user-list/user-list.module').then(
        m => m.UserListModule
      ),
  },
  { path: '**', redirectTo: 'user-list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
