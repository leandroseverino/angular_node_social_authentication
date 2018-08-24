import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-register',
  template: `
    <mat-card>
        <mat-card-header>
            <mat-card-title>Register a User</mat-card-title>
            <mat-card-subtitle>Add the new User info below:</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <form class="example-form">
            <mat-form-field class="example-full-width">
                <input matInput placeholder="Name" [formControl]="nameFormControl" type="text">
              <mat-error *ngIf="nameFormControl.hasError('required')">
                Name is <strong>required</strong>
              </mat-error>
            </mat-form-field>
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
            <mat-form-field class="example-full-width">
              <textarea matInput placeholder="Leave a description" [formControl]="descriptionFormControl"></textarea>
              <mat-error *ngIf="descriptionFormControl.hasError('required')">
                Description is <strong>required</strong>
              </mat-error>
            </mat-form-field>
          </form>
        </mat-card-content>
        <mat-card-actions align="start">
            <button mat-raised-button color="primary" (click)="onSave()">Register</button>
        </mat-card-actions>
    </mat-card>
  `,
  styles: [
  '.example-form { min-width: 150px; max-width: 500px; width: 100%; }',
  '.example-full-width { width: 100%; margin: 13px 10px auto;}'
]
})
export class RegisterComponent implements OnInit {

  registrationData = {};

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  descriptionFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private service: AuthService) {}

  ngOnInit() {

  }

  onSave() {
    this.registrationData = { name: this.nameFormControl.value,
      email: this.emailFormControl.value,
      password: this.passwordFormControl.value,
      description: this.descriptionFormControl.value
    };
    this.service.registerUser(this.registrationData);
  }
}
