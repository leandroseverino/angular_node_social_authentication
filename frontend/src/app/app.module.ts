import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Third part Modules/Components
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

// Services
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { AuthInterceptorService } from './auth-interceptor.service';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { UsersComponent } from './users.component';
import { ProfileComponent } from './profile.component';
import { PostComponent } from './post.component';
import { MessagesComponent } from './messages.component';

const routes = [
  { path: '', component: PostComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: 'profile/:id', component: ProfileComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    ProfileComponent,
    PostComponent,

    MessagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),

    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatListModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    AuthService,
    ApiService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
