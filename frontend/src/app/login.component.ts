import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  template: `
    <mat-card>
        <mat-card-header>
            <mat-card-title>Login</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form class="example-form">
            <mat-form-field class="example-full-width">
              <input matInput placeholder="Email" [formControl]="emailFormControl" type="email">
              <mat-error *ngIf="emailFormControl.hasError('email') && !emailFormControl.hasError('required')">
                Please enter a valid email address
              </mat-error>
              <mat-error *ngIf="emailFormControl.hasError('required')">
                Email is <strong>required</strong>
              </mat-error>
            </mat-form-field>
            <mat-form-field class="example-full-width">
              <input matInput placeholder="Password" [formControl]="passwordFormControl" type="password">
              <mat-error *ngIf="passwordFormControl.hasError('required')">
                Password is <strong>required</strong>
              </mat-error>
            </mat-form-field>
          </form>
        </mat-card-content>
        <mat-card-actions align="start">
            <button mat-raised-button color="primary" (click)="onLogin()">Login</button>
        </mat-card-actions>
    </mat-card>
  `,
  styles: [
  '.example-form { min-width: 150px; max-width: 500px; width: 100%; }',
  '.example-full-width { width: 100%; margin: 13px 10px auto;}'
]
})
export class LoginComponent implements OnInit {

  loginData = {};

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private service: AuthService) {}

  ngOnInit() {

  }

  onLogin() {
    this.loginData = { email: this.emailFormControl.value, password: this.passwordFormControl.value};
    this.service.loginUser(this.loginData);
  }
}
