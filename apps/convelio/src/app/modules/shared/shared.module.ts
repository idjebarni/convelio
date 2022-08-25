import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UserColorPipe } from './pipes/user-color.pipe';
import { UserInitialsPipe } from './pipes/user-initial.pipe';

@NgModule({
  declarations: [NotFoundComponent, UserColorPipe, UserInitialsPipe],
  imports: [CommonModule, RouterModule, MatButtonModule],
  exports: [UserColorPipe, UserInitialsPipe],
})
export class SharedModule {}
