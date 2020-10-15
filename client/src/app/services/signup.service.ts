import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UserToken } from '../models/userToken.model';
import { tap } from 'rxjs/operators';

interface SignUpResponse {
  success: boolean;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private http: HttpClient) {}

  userToken = new Subject<UserToken>();

  signUp(email: string, password: string) {
    return this.http
      .post<SignUpResponse>('http://localhost:5000/api/auth/register', {
        email: email,
        password: password,
      })
      .pipe(
        tap((res) => {
          if (res.success === true) {
            const userToken = new UserToken(res.token);
            this.userToken.next(userToken);
          }
        })
      );
  }
}
