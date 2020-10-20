import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {
  data;
  loading: boolean = true;
  currentGoal: number = 400;
  expensesMean: number;
  currentExpenses: number;
  monthsTotal: number;
  currentMonth: number;

  constructor(private DataService: DataService) {}

  monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  ngOnInit(): void {
    this.DataService.getTransactions().subscribe((res) => {
      this.data = res.data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      this.monthsTotal =
        this.monthDiff(
          new Date(res.data[res.data.length - 1].date),
          new Date()
        ) + 1;

      console.log(this.monthsTotal);
      this.currentMonth = new Date().getMonth() + 1;

      this.currentExpenses = res.data
        .filter((c) => c.date.substring(5, 2) === this.currentMonth)
        .reduce((acc, c) => acc + c, 0)
        .toFixed(2);

      this.expensesMean = +(
        res.data.reduce((acc, c) => acc + c.amount, 0) / this.monthsTotal
      ).toFixed(2);

      this.loading = false;
    });
  }
}
