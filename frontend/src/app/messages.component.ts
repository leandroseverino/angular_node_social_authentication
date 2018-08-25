import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from './api.service';

@Component({
  selector: 'app-messages',
  template: `
  <div *ngFor="let message of service.messages">
    <mat-card>{{ message.message }}</mat-card>
  </div>`
})
export class MessagesComponent implements OnInit {

  constructor(public service: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    const userId = this.route.snapshot.params.id;
    console.log('userId', userId);
     this.service.getMessages(userId);
  }

}
