import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  messages = <any>[];

  backend_url = environment.backend_url;

  TOKEN_KEY = 'token';

  constructor( private http: HttpClient) { }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  public logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  registerUser(registrationData: any) {
    this.http.post<any>(this.backend_url + 'auth/register', registrationData)
      .subscribe(response => {
        this.saveToken(response.token);
      } );
  }

  loginUser(loginData: any) {
    this.http.post<any>(this.backend_url + 'auth/login', loginData)
      .subscribe(response => {
        console.log(response);
        this.saveToken(response.token);
    });
  }

  private saveToken(token) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }
}
