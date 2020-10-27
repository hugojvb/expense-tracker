import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any> {
    return this.http.get(
      'https://expensetrackerhugojvb.herokuapp.com/api/transactions/'
    );
  }

  postTransactions(name: string, amount: number): Observable<any> {
    return this.http.post(
      'https://expensetrackerhugojvb.herokuapp.com/api/transactions/',
      {
        name: name,
        amount: amount,
      }
    );
  }

  deleteTransactions(id: string): Observable<any> {
    return this.http.delete(
      `https://expensetrackerhugojvb.herokuapp.com/api/transactions/${id}`
    );
  }
}
