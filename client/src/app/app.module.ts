import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuardService } from './services/authGuard/authGuard.service';

import {
  AppComponent,
  HeaderComponent,
  DashboardComponent,
  ProfileComponent,
  HomeComponent,
  RegisterComponent,
  LoginComponent,
} from './components';

import {
  AuthService,
} from './services';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuardService] },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    ProfileComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [
    AuthService, AuthGuardService
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
