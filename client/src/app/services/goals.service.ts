import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoalsService {
  constructor(private http: HttpClient) {}

  getGoals(): Observable<any> {
    return this.http.get('http://localhost:5000/api/goals/');
  }

  postGoals(goal: number): Observable<any> {
    return this.http.post('http://localhost:5000/api/goals/', { goal: goal });
  }
}
