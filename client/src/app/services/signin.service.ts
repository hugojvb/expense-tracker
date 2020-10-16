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
            localStorage.setItem('userToken', JSON.stringify(userToken));
          }
        })
      );
  }

  signOut() {
    this.userToken.next(null);
  }
}
