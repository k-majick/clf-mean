import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(
    private http: HttpClient,
  ) { }

  registerUser(user): any {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:7777/users/register', user, { headers: headers })
      .pipe(
        map(res => res),
        catchError(this.handleError),
    );
  }

  authenticateUser(user): any {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:7777/users/authenticate', user, { headers: headers })
      .pipe(
        map(res => res),
        catchError(this.handleError),
    );
  }

  getProfile() {
    const token = localStorage.getItem('id_token');
    console.log(token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    }
    return this.http.get('http://localhost:7777/users/profile', httpOptions)
      .pipe(
        map(res => res),
        catchError(this.handleError),
    )
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    // console.log('loadToken ' + token);
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    return Observable.throw(error.message || 'Server error');
  }
}
