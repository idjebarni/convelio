import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'convelio-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss'],
})
export class UserItemComponent implements OnInit {
  @Input() user: User | undefined;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  ngOnInit(): void {
    console.log('user item');
  }
}
