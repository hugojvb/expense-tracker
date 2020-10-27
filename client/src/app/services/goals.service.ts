import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoalsService {
  constructor(private http: HttpClient) {}

  getGoals(): Observable<any> {
    return this.http.get(
      'https://expensetrackerhugojvb.herokuapp.com/api/goals/'
    );
  }

  postGoals(goal: number): Observable<any> {
    return this.http.post(
      'https://expensetrackerhugojvb.herokuapp.com/api/goals/',
      { goal: goal }
    );
  }

  deleteGoals(id): Observable<any> {
    return this.http.delete(
      `https://expensetrackerhugojvb.herokuapp.com/api/goals/${id}`
    );
  }
}
