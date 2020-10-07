import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  transactions: any;

  constructor(private http: HttpClient) {}

  getData(): any {
    return this.http.get('http:localhost:5000/transactions/');
  }
}
