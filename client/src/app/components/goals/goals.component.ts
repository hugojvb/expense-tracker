import { Component, OnInit } from '@angular/core';
import { GoalsService } from '../../services/goals.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css'],
})
export class GoalsComponent implements OnInit {
  data;
  loading: boolean = true;
  currentGoal: number;
  noData: boolean;

  constructor(private goalsService: GoalsService) {}

  ngOnInit(): void {
    this.goalsService.getGoals().subscribe((res) => {
      // sorting the goals newest to oldest
      this.data = res.data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      if (this.data.length > 0) {
        this.currentGoal = this.data[0].goal;
      } else {
        this.currentGoal = null;
        this.noData = true;
      }

      this.loading = false;
    });
  }
}
