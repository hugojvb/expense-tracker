import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { exhaustMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any> {
    return this.http.get('http://localhost:5000/api/transactions/');
  }

  postTransactions(): Observable<any> {
    return this.http.post('http://localhost:5000/api/transactions/', {});
  }
}
