import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css'],
})
export class GoalsComponent implements OnInit {
  data;
  loading: boolean = true;

  constructor(private DataService: DataService) {}

  ngOnInit(): void {
    this.DataService.getTransactions().subscribe((res) => {
      this.data = res.data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      this.loading = false;
    });
  }
}
