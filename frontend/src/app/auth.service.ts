import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  messages = <any>[];

  constructor( private http: HttpClient) { }

  registerUser(registrationData: any) {
    this.http.post<any>('http://localhost:3000/register', registrationData).subscribe( response => {} );
  }

  loginUser(loginData: any) {
    this.http.post<any>('http://localhost:3000/login', loginData).subscribe( response => {
      console.log(response);
      localStorage.setItem('token', response.token);
    });
  }
}
