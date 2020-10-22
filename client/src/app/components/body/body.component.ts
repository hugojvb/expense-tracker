import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  // method for finding the TOTAL MONTHS that the user has data. From first record to now
  monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  ngOnInit(): void {
    // getting the data from api onInit
    this.DataService.getTransactions().subscribe((res) => {
      // sorting the transactions array NEWEST to OLDEST
      this.data = res.data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      // Validate if there is data
      if (this.data.length !== 0) {
        this.monthsTotal =
          this.monthDiff(
            new Date(this.data[this.data.length - 1].date),
            new Date()
          ) + 1;

        this.currentMonth = new Date().getMonth() + 1;

        // Mean of Expenses per Month
        this.expensesMean = +(
          this.data.reduce((acc, c) => acc + c.amount, 0) / this.monthsTotal
        ).toFixed(2);

        // Expenses this Month
        this.currentExpenses = this.data
          .filter((c) => parseInt(c.date.substring(5, 7)) === this.currentMonth)
          .reduce((acc, c) => acc + c.amount, 0)
          .toFixed(2);
      } else {
        this.currentExpenses = 0;
        this.expensesMean = 0;
      }

      this.loading = false;
    });
  }
}
