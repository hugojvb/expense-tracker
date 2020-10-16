import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignInService } from './signin.service';
import { exhaustMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private signInService: SignInService) {}

  getTransactions(): any {
    return this.http.get('http://localhost:5000/api/transactions/');
  }

  postTransactions(): any {
    return this.http.post('http://localhost:5000/api/transactions/', {});
  }
}
