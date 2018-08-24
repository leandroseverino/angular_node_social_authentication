import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  messages = <any>[];
  users = <any>[];

  constructor( private http: HttpClient) { }

  getMessages() {
    this.http.get<any>('http://localhost:3000/posts').subscribe( response => {
      this.messages = response;
    });
  }

  getUsers() {
    this.http.get<any>('http://localhost:3000/users').subscribe( response => {
      this.users = response;
    });
  }

  getUserProfile(profileId: string) {
    return this.http.get<any>('http://localhost:3000/profile/' + profileId);
  }

}
