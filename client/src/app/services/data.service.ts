import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'token',
  });

  getTransactions(): any {
    return this.http.get('http://localhost:5000/api/transactions/');
  }

  postTransactions(): any {
    return this.http.post('http://localhost:5000/api/transactions/', {});
  }
}
