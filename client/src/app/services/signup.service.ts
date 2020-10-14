import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface SignUpResponse {
  success: boolean;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http.post<SignUpResponse>('http:localhost:5000/register', {
      email: email,
      password: password,
    });
  }
}
