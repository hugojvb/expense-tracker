import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

interface SignInResponse {
  success: boolean;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(private http: HttpClient) {}

  user = new Subject();

  signIn(email: string, password: string) {
    return this.http.post<SignInResponse>(
      'http://localhost:5000/api/auth/login',
      {
        email: email,
        password: password,
      }
    );
  }
}
