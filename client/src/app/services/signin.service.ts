import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface SignInResponse {
  success: boolean;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  constructor(private http: HttpClient) {}

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
