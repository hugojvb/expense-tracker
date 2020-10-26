import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any> {
    return this.http.get('http://localhost:5000/api/transactions/');
  }

  postTransactions(name: string, amount: number): Observable<any> {
    return this.http.post('http://localhost:5000/api/transactions/', {
      name: name,
      amount: amount,
    });
  }

  deleteTransactions(id: string): Observable<any> {
    return this.http.delete(`http://localhost:5000/api/transactions/${id}`);
  }
}
