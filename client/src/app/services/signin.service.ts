import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UserToken } from '../models/userToken.model';
import { tap } from 'rxjs/operators';

interface SignInResponse {
  success: boolean;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(private http: HttpClient) {}

  userToken = new BehaviorSubject<UserToken>(null);
  private tokenExpirationTimer: any;

  signIn(email: string, password: string) {
    return this.http
      .post<SignInResponse>('http://localhost:5000/api/auth/login', {
        email: email,
        password: password,
      })
      .pipe(
        tap((res) => {
          if (res.success === true) {
            const userToken = new UserToken(res.token);
            this.userToken.next(userToken);
            this.autoSignOut();
            localStorage.setItem('userToken', JSON.stringify(userToken));
          }
        })
      );
  }

  autoSignIn() {
    const userStored: { _token: string } = JSON.parse(
      localStorage.getItem('userToken')
    );
    if (!userStored) {
      return;
    }

    const loadedUser = new UserToken(userStored._token);

    if (loadedUser.token) {
      this.userToken.next(loadedUser);
      this.autoSignOut();
    }
  }

  signOut() {
    this.userToken.next(null);
    localStorage.removeItem('userToken');
    if (this.tokenExpirationTimer) {
      return clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoSignOut() {
    this.tokenExpirationTimer = setTimeout(() => {
      this.signOut();
    }, 24 * 3600000);
  }
}
