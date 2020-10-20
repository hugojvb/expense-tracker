import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  constructor(private DataService: DataService) {}
  data;
  loading: boolean = true;

  ngOnInit(): void {
    this.DataService.getTransactions().subscribe((res) => {
      this.data = res.data;
      this.loading = false;
    });
  }
}
