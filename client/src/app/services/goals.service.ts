import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoalsService {
  constructor(private http: HttpClient) {}

  getGoals() {
    return this.http.get('http://localhost:5000/api/goals/');
  }

  postGoals() {
    return this.http.post('http://localhost:5000/api/transactions/', {});
  }
}
