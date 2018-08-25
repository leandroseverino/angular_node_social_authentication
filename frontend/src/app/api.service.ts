import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  messages = <any>[];
  users = <any>[];

  backend_url = environment.backend_url;

  constructor( private http: HttpClient) { }

  getMessages(userId) {
    this.http.get<any>(this.backend_url + 'posts/' + userId)
      .subscribe(response => {
        console.log('messages from server', response);
        this.messages = response;
    });
  }

  getUsers() {
    this.http.get<any>(this.backend_url + 'users')
      .subscribe(response => {
        this.users = response;
    });
  }

  getUserProfile(profileId: string) {
    return this.http.get<any>(this.backend_url + 'profile/' + profileId);
  }

  postMessage(messageContent: any) {
    this.http.post<any>(this.backend_url + 'posts', messageContent)
      .subscribe(response => {
        console.log(response);
    });
  }

}
