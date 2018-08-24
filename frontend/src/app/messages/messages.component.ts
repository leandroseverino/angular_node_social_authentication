import { Component, OnInit } from '@angular/core';

import { ApiService } from './../api.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private service: ApiService) {}

  ngOnInit() {
   this.service.getMessages();
  }

}
