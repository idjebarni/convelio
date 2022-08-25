import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UserColorPipe } from './pipes/user-color.pipe';

@NgModule({
  declarations: [NotFoundComponent, UserColorPipe],
  imports: [CommonModule, RouterModule, MatButtonModule],
  exports: [UserColorPipe],
})
export class SharedModule {}
