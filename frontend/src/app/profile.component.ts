import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ApiService } from './api.service';


@Component({
  selector: 'app-profile',
  template: `
    <mat-card>
        <mat-card-header>
            <mat-card-title>Profile</mat-card-title>
        </mat-card-header>
        <mat-card-content>
        <mat-list>
          <mat-list-item>Name: {{profile.name}} </mat-list-item>
          <mat-list-item>E-mail: {{profile.email}} </mat-list-item>
          <mat-list-item>Description: {{profile.description}} </mat-list-item>
          </mat-list>
        </mat-card-content>
        <mat-card-actions align="start">

        </mat-card-actions>
    </mat-card>
  `,
  styles: [
  '.example-form { min-width: 150px; max-width: 500px; width: 100%; }',
  '.example-full-width { width: 100%; margin: 13px 10px auto;}'
]
})
export class ProfileComponent implements OnInit {

  profile = {};

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(private service: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.service.getUserProfile(id).subscribe(data => {
      this.profile = data.user;
    });
  }

}
