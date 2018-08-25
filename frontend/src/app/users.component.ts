import { Component, OnInit } from '@angular/core';

import { ApiService } from './api.service';

@Component({
  selector: 'app-user',
  template: `
    <div *ngFor="let u of service.users">
      <mat-card [routerLink]="['/profile', u._id]" style="cursor:pointer;">{{ u.name }}</mat-card>
    </div>
  `
})
export class UsersComponent implements OnInit {

  constructor(public service: ApiService) {}

  ngOnInit() {
    this.service.getUsers();
  }

}
