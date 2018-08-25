import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ApiService } from './api.service';


@Component({
  selector: 'app-posts',
  template: `
    <mat-card>
      <mat-card-header>
          <mat-card-title>New Post</mat-card-title>
          <mat-card-subtitle>Add the new Post content below:</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <form class="example-form">
          <mat-form-field class="example-full-width">
            <textarea matInput placeholder="Post Content" [formControl]="messageFormControl"></textarea>
            <mat-error *ngIf="messageFormControl.hasError('required')">
              The Post Content is <strong>required</strong>
            </mat-error>
          </mat-form-field>
        </form>
      </mat-card-content>
      <mat-card-actions align="start">
          <button mat-raised-button color="primary" (click)="onSave()">Save</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    '.example-form { min-width: 150px; max-width: 500px; width: 100%; }',
    '.example-full-width { width: 100%; margin: 13px 10px auto;}'
  ]
})
export class PostComponent implements OnInit {

  messageData = {};

  messageFormControl = new FormControl('', [
    Validators.required,
  ]);


  constructor(private service: ApiService) {}

  ngOnInit() {

  }

  onSave() {
    this.messageData = { message: this.messageFormControl.value };
    this.service.postMessage(this.messageData);
  }

}
