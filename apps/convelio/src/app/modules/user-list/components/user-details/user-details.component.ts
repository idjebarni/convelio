import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'convelio-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
